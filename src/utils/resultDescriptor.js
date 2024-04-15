const resultDescriptor = (resultDesc) => {
    let description;
    switch (resultDesc) {
        case 'W':
            description = 'Game Concluded By Checkmate'
            break;
        case 'L':
            description = 'Game Concluded By Checkmate'
            break;
        case 'T':
            description = 'Game Concluded By Timeout'
            break;
        case 'OT':
            description = 'Game Concluded By Timeout'
            break;
        case 'R':
            description = 'Game Concluded By Resignation'
            break;
        case 'OR':
            description = 'Game Concluded By Resignation'
            break;
        case 'MA':
            description = 'Game Concluded By Mutual Agreement'
            break;
        case 'SD':
            description = 'Game Concluded By Stalemate'
            break;
        default:
            description = 'Game Drawn'
            break;
    }
    return description;
}

const resultConclusion = (resultDesc) => {
    let description;
    switch (resultDesc) {
        case 'W':
            description = 'white wins'
            break;
        case 'L':
            description = 'black wins'
            break;
        case 'T':
            description = 'black wins'
            break;
        case 'OT':
            description = 'white wins'
            break;
        case 'R':
            description = 'black wins'
            break;
        case 'OR':
            description = 'white wins'
            break;
        default:
            description = 'game drawn'
            break;
    }
    return description;
}

export {resultConclusion, resultDescriptor}