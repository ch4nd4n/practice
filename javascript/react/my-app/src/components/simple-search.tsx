import React, {useState} from 'react';

interface SimpleSearchProps {
  keywords: string[];
}

function filter(term:string, keys: string[]) {
  const regEx = new RegExp(term, 'i');
  const filtered = keys.filter(key => {
    return key.search(regEx) > -1;
  });
  console.log(filtered);
  return filtered;
}
const SimpleSearch = (props: SimpleSearchProps) => {
  const { keywords } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [filteredList, setFilteredList] = useState(keywords);


  return <div>
    <input placeholder="Search" onChange={ (e) => {
      setFilteredList(filter(e.target.value, keywords));
    }} />
    <ul>
      { filteredList && filteredList.map(k => {return <li>{k}</li>}) }
    </ul>
  </div>
}

export default SimpleSearch;

