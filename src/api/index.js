
export const getSetData = async (url) => {
    try {
        let { hasMore, cardData, nextPage } = await fetchCardData(url)
        if (hasMore === true) {
            const nextPageData = await getSetData(nextPage);
            cardData = [...cardData, ...nextPageData];
        }
        return cardData
    } catch (err) {
        console.log('data not found');
        console.error(err)
    }
}

export const fetchCardData = async (url) => {
    const response = await fetch(url);
    const { data, has_more: hasMore, next_page: nextPage } = await response.json();
    const cardData = data.map(({ name, prices, rarity, type_line, image_uris, card_faces }) => ({ name, prices, rarity, type_line, image_uris, card_faces }));
    return { hasMore, cardData, nextPage }
}

export const getSetList = async () => {
    const response = await fetch('https://api.scryfall.com/sets');
    const { data } = await response.json();
    let mastersList = ['dmr', '2x2', 'tsr', '2xm', 'uma', 'a25', 'ima', 'mm3', 'ema', 'mm2', 'mma'];
    let falseSets = ['tscd', 'j21', 'h1r', 'tsb', '4bb', 'sum', 'fbb', 'jmp', 'j22'];
    let boosterSets = data.map(({ code, name, set_type, released_at }) => {
        if (set_type === 'core' || set_type === 'expansion' || set_type === 'draft_innovation') {
            if (!falseSets.includes(code)) {
                return { code, name, set_type, release_date: released_at }
            }
        } else if (set_type === 'masters' && mastersList.includes(code)) {
            return { code, name, set_type, release_date: released_at }
        }
    })
    boosterSets = boosterSets.filter(set => set !== undefined);
    return boosterSets
}

export const getSetInfo = async (setCode) => {
    const response = await fetch(`https://api.scryfall.com/sets/${setCode}`);
    const setInfo = await response.json();
    return setInfo
}