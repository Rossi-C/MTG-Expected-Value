import { getSetData, getSetInfo } from "../../api";
import { packRarity } from "./packRarirty";
import { packsInBox } from "./packsInBox";

export const setEV = async (set) => {
    const url = `https://api.scryfall.com/cards/search?q=s%3A${set}+is%3Abooster`;
    const setData = await getSetData(url);
    const setInfo = await getSetInfo(set);
    const setReleaseDate = new Date(setInfo.released_at);
    const setType = setInfo.set_type;

    const { comInPack, uncomInPack, rareInPack, mythInPack, basicLandInPack, specialInPack } = packRarity(set, setReleaseDate, setType);

    //find num of commons, uncommons, rares, mythics in set
    let commons = 0;
    let uncommons = 0;
    let rares = 0;
    let mythics = 0;
    let specials = 0;
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
        } else specials++;
    }
    commons -= basicLands;

    let probOfComm = comInPack / commons;
    let probOfUncomm = uncomInPack / uncommons;
    let probOfRare = rareInPack / rares;
    let probOfMythic = mythInPack / mythics;
    let probOfBasicLand = basicLandInPack / basicLands;
    let probOfSpecial = specialInPack / specials;

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
            return { ...commonReturn, probability: probOfBasicLand }
        } else if (rarity === 'common') {
            return { ...commonReturn, probability: probOfComm }
        } else if (rarity === 'uncommon') {
            return { ...commonReturn, probability: probOfUncomm }
        } else if (rarity === 'rare') {
            return { ...commonReturn, probability: probOfRare }
        } else if (rarity === 'mythic') {
            return { ...commonReturn, probability: probOfMythic }
        } else {
            return { ...commonReturn, probability: probOfSpecial }
        }
    })

    //calcing pack value including all cards in set
    let packValue = 0;
    let cardValue = 0;
    for (let card of newSetData) {
        cardValue = (card.price * card.probability);
        packValue += cardValue;
    }

    console.log(packValue);

    //numPacks will be variable based upon the set later
    const numPacks = packsInBox(set, setType);
    const boxValue = packValue * numPacks;

    //make seperate "valuelist" that excludes cards with price < $2
    const valueSetData = newSetData.filter(card => parseFloat(card.price) >= 2);

    //calcing pack value excluding cards < $2
    let filteredPackValue = 0;
    let filteredCardValue = 0;
    for (let card of valueSetData) {
        filteredCardValue = (card.price * card.probability);
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

    return setEVData
}