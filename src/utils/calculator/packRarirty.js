
export const packRarity = (set, setReleaseDate, setType) => {
    const urzlReleaseDate = new Date('1999-02-15'); //first set with foils
    const soaReleaseDate = new Date('2008-10-03'); //first set with mythics
    const c20ReleaseDate = new Date('2019-07-12'); //increased foil rate
    const zrReleaseDate = new Date('2020-09-25'); //increased mythic rate

    let comInPack = 10;
    let uncomInPack = 3;
    let rareInPack = 0;
    let mythInPack = 0;
    let basicLandInPack = 1;
    let specialInPack = 0;

    if (set === 'arn' || set === 'atq' || set === 'drk' || set === 'fem' || set === 'hml') {
        comInPack = 6;
        uncomInPack = 1.5;
        rareInPack = .5;
        basicLandInPack = 0;
    } else if (set === 'lea') {
        comInPack = 6.7276;
        uncomInPack = 2.355;
        rareInPack = .9587;
        basicLandInPack = 4.9587;
    } else if (set === 'leb' || set === '2ed') {
        comInPack = 6.8178;
        uncomInPack = 2.355;
        rareInPack = .9669;
        basicLandInPack = 4.8603;
    } else if (set === '3ed') {
        comInPack = 6.8178;
        uncomInPack = 2.355;
        rareInPack = 1;
        basicLandInPack = 4.8272;
    } else if (set === 'chr' || set === 'all') {
        comInPack = 9;
        uncomInPack = 2.25;
        rareInPack = .75;
        basicLandInPack = 0;
    } else if (set === '6ed' || set === 'uzl' || set === 'uds') {
        comInPack = 11;
        rareInPack = 1;
        basicLandInPack = 0;
    } else if (set === '2xm' || set === '2x2') {
        comInPack = 8;
        rareInPack = 1.7298;
        mythInPack = .2702;
        basicLandInPack = 0;
    } else if (set === 'tsr') {
        rareInPack = .8649;
        mythInPack = .1351;
        specialInPack = 1;
        basicLandInPack = 0;
    } else if (setType === 'masters') {
        rareInPack = .8649;
        mythInPack = .1351;
    } else if (setReleaseDate < urzlReleaseDate) {
        comInPack = 11;
        rareInPack = 1;
        basicLandInPack = 0;
    } else if (setReleaseDate > urzlReleaseDate && setReleaseDate < soaReleaseDate) {
        rareInPack = 1;
    } else if (setReleaseDate > soaReleaseDate && setReleaseDate < c20ReleaseDate) {
        rareInPack = .875;
        mythInPack = .125;
    } else if (setReleaseDate > c20ReleaseDate && setReleaseDate < zrReleaseDate) {
        rareInPack = .875;
        mythInPack = .125;
    } else {
        rareInPack = .8649;
        mythInPack = .1351;
    }

    const packRarityData = {
        comInPack: comInPack,
        uncomInPack: uncomInPack,
        rareInPack: rareInPack,
        mythInPack: mythInPack,
        basicLandInPack: basicLandInPack,
        specialInPack: specialInPack,
    }

    return packRarityData
}

