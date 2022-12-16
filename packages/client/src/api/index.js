
export const getSetData = async (url) => {
    let { hasMore, cardData, nextPage } = await fetchCardData(url);
    if (hasMore === true) {
        const nextPageData = await getSetData(nextPage);
        cardData = [...cardData, ...nextPageData];
    }
    return cardData
}

export const fetchCardData = async (url) => {
    try {
        const response = await fetch(url);
        const { data, has_more: hasMore, next_page: nextPage } = await response.json();
        const cardData = data.map(({ name, prices, rarity, type_line, image_uris, card_faces }) => ({ name, prices, rarity, type_line, image_uris, card_faces }));
        return { hasMore, cardData, nextPage }
    } catch (err) {
        throw err;
    }

}

export const getSetList = async () => {
    try {
        const response = await fetch('https://api.scryfall.com/sets');
        const { data } = await response.json();
        let mastersList = ['uplist', 'slx', 'klr', 'plist', 'akr', 'fmb1', 'mb1', 'tpr', 'vma', 'me4', 'me3', 'me2', 'me1', 'ren', 'rin'];
        let falseSets = ['tscd', 'j21', 'h1r', 'tsb', '4bb', 'sum', 'fbb', 'jmp', 'j22', 'dbl', 'clb', 'cmr'];
        // eslint-disable-next-line
        let boosterSets = data.map(({ code, name, set_type, released_at, icon_svg_uri }) => {
            if (set_type === 'core' || set_type === 'expansion' || set_type === 'draft_innovation') {
                if (!falseSets.includes(code)) {
                    return { code, name, set_type, release_date: released_at, icon_svg_uri }
                }
            } else if (set_type === 'masters' && !mastersList.includes(code)) {
                return { code, name, set_type, release_date: released_at, icon_svg_uri }
            }
        })
        boosterSets = boosterSets.filter(set => set !== undefined);
        return boosterSets
    } catch (err) {
        throw err;
    }

}

export const getSetInfo = async (setCode) => {
    try {
        const response = await fetch(`https://api.scryfall.com/sets/${setCode}`);
        const setInfo = await response.json();
        return setInfo
    } catch (err) {
        throw err;
    }
}
