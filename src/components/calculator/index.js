import { getSetData } from "../../api";

export const packEV = async (set) => {
    const url = `https://api.scryfall.com/cards/search?q=s%3A${set}+is%3Abooster`;
    const setData = await getSetData(url);
    const setLen = setData.length;
    const cardsInPack = (set) => {

    }

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

    //make seperate "valuelist" that excludes cards with price < $2
    const valueCards = setData.filter(card => parseFloat(card.prices.usd) >= 0);

    let newSetData = valueCards.map(({ name, prices, rarity, type_line }) => {
        if (type_line.toLowerCase().includes('basic') || type_line.toLowerCase().includes('gate')) {
            return { name, price: prices.usd, rarity, probability: probOfLand, type: type_line }
        } else if (rarity === 'common') {
            return { name, price: prices.usd, rarity, probability: probOfComm, type: type_line }
        } else if (rarity === 'uncommon') {
            return { name, price: prices.usd, rarity, probability: probOfUncomm, type: type_line }
        } else if (rarity === 'rare') {
            return { name, price: prices.usd, rarity, probability: probOfRare, type: type_line }
        } else {
            return { name, price: prices.usd, rarity, probability: probOfMythic, type: type_line }
        }
    })

    let packValue = 0;
    let cardValue = 0;
    for (let card of newSetData) {
        cardValue = card.price * card.probability;
        packValue += cardValue;
    }

    //if set is before shards of alara (no mythics yet) then
    //  nested - if (set === LEA(alpha) or LEB(beta) or 2ED(unlimited)) find probabilities for cards > $2
    //      note - alpha(p(rare-land)=.0413 p(uncom-land)=.215 p(comm-land)=38.84)
    //  nested - else (find probabilities for cards > $2) 
    //else if set is before battle for zendi then find probs for cards > $2 note - %12.5 for pack to have myth insted of rare
    //else find probs for cards > $2 note - %13.51 for pack to have myth insted of rare
    return packValue
}