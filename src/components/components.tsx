

export interface IEpisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: any;
    summary: string | null;
    _links: { self: { href: string } };
}



export const EpisodeCard = (props: IEpisode) => {
    let { id, url, name, season, number, type, airdate, airtime, airstamp, runtime, image, summary, _links } = props;

    const chooseImage = (image: any) => {
        if (image == null)
            return ('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png')
        else
            return image.medium
    }

    const chooseSummary = (summary: string | null) => {
        if (summary == null) {
            return ('Not yet aired')
        }
        else {
            return summary
        }
    }

    let chosenSummary = chooseSummary(summary)
    let chosenImage = chooseImage(image)

    return (
        <div className='main-container' id={`${id}`}>

            <div className='add-item-box'>
                <p>{name} - {' '}
                    <span>{season < 10 ? (`S0${season}`) : (`S${season}`)}</span>
                    <span>{number < 10 ? (`E0${number}`) : (`E${number}`)}</span>
                </p>
            </div>
            <img src={chosenImage} alt="Picture" />
            <div className='add-item-box'>
                {chosenSummary}
            </div>
        </div>
    )
}


// {
//     medium: string;
//     original: string;
// };