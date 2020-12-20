import React, { useEffect, useState } from 'react';


interface Beer{
    id: String,
    name: String,
    brewery: String,
    type: String,
    rating: Number 
}


const Update = (props : {onFinish: React.Dispatch<React.SetStateAction<boolean>>, beer: Beer}) => {

    const [name, setName] = useState(props.beer.name)
    const [brewery, setBrewery] = useState(props.beer.brewery)
    const [id, setId] = useState(props.beer.id)
    const [type, setType] = useState(props.beer.type)
    const [rating, setRating] = useState(props.beer.rating.toString())

    const baseURL = "https://beer-api-2020.herokuapp.com/beers/"


    const sendUpdate = () => {

        fetch(baseURL, {
            method:"POST",
            body : JSON.stringify({ id:id, name:name, brewery:brewery, type:type, rating:rating}),
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        })
        .then(resp=>{
            if(resp.ok){
                updateSuccess(true)
            }else{
                updateSuccess(false)
            }
        })
    }

    const sendDelete = () => {

        fetch(baseURL+"id="+id, {
            method:"DELETE",
        })
        .then(resp=>{
            if(resp.ok){
                updateSuccess(true)
            }else{
                updateSuccess(false)
            }
        })
    }

    const onSubmit = () => {
        sendUpdate()
        props.onFinish(false)
    }

    const onDelete = () => {
        sendDelete()
        props.onFinish(false)
    }

    const updateSuccess = (success : Boolean) => {
        if(success){
            window.alert("Beer updated!")
        }
        else{
            window.alert("Oppps, Can't update beer =(")
        }
    }

    return <div id="updateContainer">
        <table id="updateTable">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td><input type="text" value={name.toString()} onChange={e => setName((e.target as HTMLInputElement).value)}/></td>
                </tr>
                <tr>
                    <td>Brewery</td>
                    <td><input type="text" value={brewery.toString()} onChange={e => setBrewery((e.target as HTMLInputElement).value)}/></td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td><input type="text" value={type.toString()} onChange={e => setType((e.target as HTMLInputElement).value)}/></td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td><input type="text" value={rating.toString()} onChange={e => setRating((e.target as HTMLInputElement).value)}/></td>
                </tr>
                <tr>
                    <td>                    
                        <button onClick={onSubmit} >Submit Changes</button>
                        <button onClick={onDelete} >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

}
export default Update