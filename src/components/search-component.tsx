import React, { useEffect, useState } from 'react';
import Update from './update-component';
import "../styles/search-styles.css"

interface Beer{
    id: String,
    name: String,
    brewery: String,
    type: String,
    rating: Number 
}

const Search = () => {

    const [beerList, setBeerList] = useState<Beer[] | null>(null)
    const [searchAttribute, setSearchAttribute] = useState("all")
    const [searchWord, setSearchWord] = useState("")
    const [editActive, setEditActive] = useState(false)
    const [editBeer, setEditBeer] = useState<Beer>({id: "", name:"", brewery:"",type:"", rating:0} as Beer)
    const [beersListed, setBeersListed] = useState(false)



    const baseURL = "http://localhost:8080/beers/"

    const fetching = (url: String) =>{
        fetch(url.toString())
            .then(resp => resp.json())
            .then((data : Beer[]) => setBeerList(data))
    }

    const addBeer = () => {
        setEditBeer({id: "", name:"", brewery:"",type:"", rating:0} as Beer)
        setEditActive(true)
    }

    
    const search = () => {

        if(searchAttribute === "all"){
            setSearchWord("")
            fetching(baseURL)
            setBeersListed(true)
        }
        else if(searchWord ===""){
            window.alert("Search field is empty")
        }else{
            fetching(baseURL+searchAttribute+"="+searchWord)
            setBeersListed(true)
        }
        setEditActive(false)
    }

    const onEdit = (event: React.MouseEvent) =>{

        var beerToEdit = beerList?.find( beer => beer.id == event.currentTarget.id)

        setEditBeer(beerToEdit as Beer)
        setEditActive(true)
    }

    const onEditSuccess = () =>{
        setEditActive(false)
        setBeersListed(false)
    }

    useEffect(() => {
      });

    const renderBeers = () => {
        if(beersListed){
                    return <table id="beerTable">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Brewery</td>
                        <td>Type</td>
                        <td>Rating</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {beerList?.map( beer => <tr key={beer.id.toString()}><td>{beer.name}</td><td>{beer.brewery}</td><td>{beer.type}</td><td>{beer.rating}</td><td><button id={beer.id.toString()} onClick={onEdit}>Edit</button></td></tr>)}
                </tbody>
            </table>
        }
        return 

    }

    const renderEditor = () => {
        if(editActive){
            return <Update beer={editBeer} onFinish={onEditSuccess} />
        }
        return
    }





    return <div >
        <div id="searchContainer">
            <input type="text" value={searchWord} onKeyDown={e => {if(e.key === 'Enter') {search()}} } onChange={e => setSearchWord((e.target as HTMLInputElement).value)}/>
            <table id="attributesTable">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input type="radio" name="attribute" value="name" checked={searchAttribute==="name"} onChange={e => setSearchAttribute((e.target as HTMLInputElement).value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Brewery</td>
                        <td>
                            <input type="radio" name="attribute" value="brewery" checked={searchAttribute==="brewery"} onChange={e => setSearchAttribute((e.target as HTMLInputElement).value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                            <input type="radio" name="attribute" value="type" checked={searchAttribute==="type"} onChange={e => setSearchAttribute((e.target as HTMLInputElement).value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>All</td>
                        <td>
                            <input type="radio" name="attribute" value="all" checked={searchAttribute==="all"} onChange={e => setSearchAttribute((e.target as HTMLInputElement).value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <input id="searchButton" type="button" value="Search" onClick={search}/>
            <input id="addButton" type="button" value="Add Beer" onClick={addBeer}/>
        </div>
        <div>
            {renderBeers()}
        </div>
        <div>
           {renderEditor()}
        </div>
    </div> 
}

export default Search