import { getSetData } from "../../api";

export const packEV = async (set) => {
    const url = `https://api.scryfall.com/cards/search?q=s%3A${set}+is%3Abooster`;
    const setData = await getSetData(url);
    const setLen = setData.length;
    let comInPack = 10;
    let uncomInPack = 3;
    let rareInPack = .8649
    //find num of commons, uncommons, rares, mythics in set
    let commons = 0;
    let uncommons = 0;
    let rares = 0;
    let mythics = 0;
    for (let card of setData) {
        if (card.rarity === 'common') {
            commons++;
        } else if (card.rarity === 'uncommon') {
            uncommons++;
        } else if (card.rarity === 'rare') {
            rares++;
        } else { mythics++; }
    }
    //removing 5 lands from the common slot
    commons -= 5
    //booster pack - 1 land, 10 commons, 3 uncommons, 1 rare or mythic
    //P(common) where 10 is num of commons in pack
    let probOfComm = comInPack / commons;
    //P(uncommon) where 3 is num of uncommons in pack
    let probOfUncomm = uncomInPack / uncommons;
    //P(rare) where 1 is num of rares in pack and .8649 is chance of pulling rare instead of mythic
    let probOfRare = rareInPack / rares;
    //P(mythic) where 1 is num of mythics in pack and .8649 is chance of pulling mythic instead of rare
    let probOfMythic = (1 - rareInPack) / mythics;
    let probOfLand = .2

    //make seperate "valuelist" that excludes cards with price < $2
    const valueCards = setData.filter(card => parseFloat(card.prices.usd) >= 2)

    let newSetData = valueCards.map(({ name, prices, rarity }) => {
        if (rarity === 'common') {
            return { name, price: prices.usd, rarity, probability: probOfComm }
        } else if (rarity === 'uncommon') {
            return { name, price: prices.usd, rarity, probability: probOfUncomm }
        } else if (rarity === 'rare') {
            return { name, price: prices.usd, rarity, probability: probOfRare }
        } else {
            return { name, price: prices.usd, rarity, probability: probOfMythic }
        }
    })

    let packValue = 0;
    let cardValue = 0;
    for (let card of newSetData) {
        cardValue = card.price * card.probability;
        packValue += cardValue;
    }

    console.log(newSetData);
    //if set is before shards of alara (no mythics yet) then
    //  nested - if (set === LEA(alpha) or LEB(beta) or 2ED(unlimited)) find probabilities for cards > $2
    //      note - alpha(p(rare-land)=.0413 p(uncom-land)=.215 p(comm-land)=38.84)
    //  nested - else (find probabilities for cards > $2) 
    //else if set is before battle for zendi then find probs for cards > $2 note - %12.5 for pack to have myth insted of rare
    //else find probs for cards > $2 note - %13.51 for pack to have myth insted of rare
    return packValue
}