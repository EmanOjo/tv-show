import './App.css';
// import data from './got-episodes.json';
import { EpisodeCard } from './components/components'
import { IEpisode } from './components/components'
import { useEffect, useState } from 'react'



const createepisodeCard = (props: IEpisode) => {

  return (
    <EpisodeCard
      id={props.id}
      url={props.url}
      name={props.name}
      season={props.season}
      number={props.number}
      type={props.type}
      airdate={props.airdate}
      airtime={props.airtime}
      airstamp={props.airstamp}
      runtime={props.runtime}
      image={props.image}
      summary={props.summary}
      _links={props._links}
    />
  )
};





const App = () => {

  
  const [data, setData] = useState<IEpisode[]>([]);


  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/82/episodes")
      .then(async response => response.json())
      .then((jsonBody: IEpisode[]) => setData(jsonBody));
  }, [])

  const [inputSearch, setInputSearch] = useState('');

  const searchResult = data.filter(function (props: IEpisode) {
    if (props.summary == null)
    {
      return false
    }
    return props.name.toUpperCase().includes(inputSearch.toUpperCase()) || props.summary.toUpperCase().includes(inputSearch.toUpperCase())
  })

  const [inputDropdown, setInputDropdown] = useState('');

  const dropdownResult = data.filter(function (props: IEpisode) {
    return props.name.toUpperCase().includes(inputDropdown.toUpperCase())})

  const array = (inputSearch: string, inputDropdown: string, data:IEpisode[]) => {
    if (inputDropdown !== '')
      return dropdownResult
    else if (inputSearch !== '')
      return searchResult
    else
    return data
}



const chosen = array(inputSearch, inputDropdown, data)

  return (
    <div>
      <select className='dropdown' value={inputDropdown} onChange={event => setInputDropdown(event.target.value)}>
        <option value={''}>Select episode</option>
        {data.map((item) =>
          <option value={item.name}>{item.name}</option>
        )}
      </select>



      <input value={inputSearch} onChange={(event => setInputSearch(event.target.value))} placeholder='Search episode' />
      <span style={{ color: 'blue' }}>{`   Displaying ${chosen.length}/${data.length}`}</span>
      <div className="flexbox-container"> {chosen.map(createepisodeCard)} </div>
    </div>
  )
};


export default App;