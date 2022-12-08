
export const packsInBox = (set, setType) => {
    let numPacks = 36;
    if (set === 'chr' || set === 'all') {
        numPacks = 45;
    } else if (set === 'arn' || set === 'atq' || set === 'drk' || set === 'fem' || set === 'hml') {
        numPacks = 60;
    } else if (set === 'tsr') {
        numPacks = 36;
    } else if (setType === 'masters') {
        numPacks = 24;
    } else {
        numPacks = 36;
    };

    return numPacks
}