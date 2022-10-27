
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
    const { data, has_more: hasMore, next_page: nextPage, } = await response.json();
    const cardData = data.map(({ name, prices, rarity }) => ({ name, prices, rarity }));
    return { hasMore, cardData, nextPage }
}
