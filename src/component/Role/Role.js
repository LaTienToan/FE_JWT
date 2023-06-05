import './Role.scss'
import { useState } from 'react'
import _ from 'lodash'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
const Role = (props) => {

    const [listChilds, setListChilds] = useState({
        child1: { url: '', description: '' },

    })

    useEffect(() => {

        Object.entries(listChilds).map(([key, value], index) => {
            console.log(key, value);
            // Pretty straightforward - use key for the key and value for the value.
            // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        })
    }, [])

    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds)

        _listChilds[key][name] = value
        setListChilds(_listChilds)
    }

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = {
            url: '',
            description: ''
        };

        setListChilds(_listChilds)


    }

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key]
        setListChilds(_listChilds)

    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <div className='title-role'>
                        <h4>Add a new roles..</h4>
                        <div className='col-12  role-parent'>
                            {
                                Object.entries(listChilds).map(([key, child], index) => {
                                    return (<>
                                        <div className='row role-child' key={`child-${key}`}>
                                            <div className={`col-5 form-group ${key}`}>
                                                <label>URL:</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={child.url}
                                                    onChange={(event) => handleOnchangeInput('url', event.target.value, key)} />
                                            </div>
                                            <div className='col-5 form-group'>
                                                <label>DESC:</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={child.description}
                                                    onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                                />
                                            </div>
                                            <div className='col-2 mt-4 actions'>
                                                <i class="fa fa-plus-circle me-3 add" onClick={() => handleAddNewInput()}></i>
                                                {index >= 1 && < i class="fa fa-trash delete"
                                                    onClick={() => handleDeleteInput(key)}
                                                ></i>}
                                            </div>
                                        </div >
                                    </>)
                                    // Pretty straightforward - use key for the key and value for the value.
                                    // Just to clarify: unlike object destructuring, the parameter names don't matter here.
                                })
                            }

                            <div>
                                <button className='btn btn-warning mt-3'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default Role