import { getSetData } from "../../api";

export const setEV = async (set) => {
    const url = `https://api.scryfall.com/cards/search?q=s%3A${set}+is%3Abooster`;
    const setData = await getSetData(url);
    let comInPack = 10;
    let uncomInPack = 3;
    let rareInPack = .8649
    //find num of commons, uncommons, rares, mythics in set
    let commons = 0;
    let uncommons = 0;
    let rares = 0;
    let mythics = 0;
    let basicLands = 0;
    for (let card of setData) {
        if (card.type_line.toLowerCase().includes('basic') || card.type_line.toLowerCase().includes('gate')) {
            basicLands++;
        } else if (card.rarity === 'common') {
            commons++;
        } else if (card.rarity === 'uncommon') {
            uncommons++;
        } else if (card.rarity === 'rare') {
            rares++;
        } else if (card.rarity === 'mythic') {
            mythics++;
        }
    }
    commons -= basicLands
    //booster pack - 1 land, 10 commons, 3 uncommons, 1 rare or mythic
    let probOfComm = comInPack / commons;
    let probOfUncomm = uncomInPack / uncommons;
    let probOfRare = rareInPack / rares;
    let probOfMythic = (1 - rareInPack) / mythics;
    let probOfLand = 1 / basicLands
    let probOfOther = 0;

    //creating new array of objects with probability number included
    let newSetData = setData.map(({ name, prices, rarity, type_line, image_uris, card_faces }) => {
        const commonReturn = {
            name,
            price: prices.usd,
            rarity,
            type: type_line,
            images: image_uris ? image_uris : card_faces[0].image_uris
        };
        if (type_line.toLowerCase().includes('basic') || type_line.toLowerCase().includes('gate')) {
            return { ...commonReturn, probability: probOfLand }
        } else if (rarity === 'common') {
            return { ...commonReturn, probability: probOfComm }
        } else if (rarity === 'uncommon') {
            return { ...commonReturn, probability: probOfUncomm }
        } else if (rarity === 'rare') {
            return { ...commonReturn, probability: probOfRare }
        } else if (rarity === 'mythic') {
            return { ...commonReturn, probability: probOfMythic }
        } else {
            return { ...commonReturn, probability: probOfOther }
        }
    })

    //calcing pack value including all cards in set
    let packValue = 0;
    let cardValue = 0;
    for (let card of newSetData) {
        cardValue = card.price * card.probability;
        packValue += cardValue;
    }

    //numPacks will be variable based upon the set later
    let numPacks = 36;
    const boxValue = packValue * numPacks;

    //make seperate "valuelist" that excludes cards with price < $2
    const valueSetData = newSetData.filter(card => parseFloat(card.price) >= 2);

    //calcing pack value excluding cards < $2
    let filteredPackValue = 0;
    let filteredCardValue = 0;
    for (let card of valueSetData) {
        filteredCardValue = card.price * card.probability;
        filteredPackValue += filteredCardValue;
    }

    const filteredBoxValue = filteredPackValue * numPacks;

    const setEVData = {
        packValue: packValue.toFixed(2),
        boxValue: boxValue.toFixed(2),
        filteredPackValue: filteredPackValue.toFixed(2),
        filteredBoxValue: filteredBoxValue.toFixed(2),
        totalSetData: newSetData,
    };



    //if set is before shards of alara (no mythics yet) then
    //  nested - if (set === LEA(alpha) or LEB(beta) or 2ED(unlimited)) find probabilities for cards > $2
    //      note - alpha(p(rare-land)=.0413 p(uncom-land)=.215 p(comm-land)=38.84)
    //  nested - else (find probabilities for cards > $2) 
    //else if set is before battle for zendi then find probs for cards > $2 note - %12.5 for pack to have myth insted of rare
    //else find probs for cards > $2 note - %13.51 for pack to have myth insted of rare
    return setEVData
}