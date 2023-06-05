import { useEffect, useState } from "react"
import '../ManageUsers/User.scss'
import { fetchAllUsers, deleteUser } from '../../service/userService'
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser";
import React from "react";
const Users = (props) => {
    const [listUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentlimit] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalDelete, setisShowModalDelete] = useState(false)
    //dataModal delete
    const [dataModal, setDataModal] = useState({})

    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')

    //modal update
    const [dataModalUser, setDataModalUser] = useState({})



    useEffect(() => {
        fetchUsers()

    }, [currentPage])



    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)
        if (response && response.EC === 0) {

            setTotalPages(response.DT.DT.totalPage)
            setListUser(response.DT.DT.users)


        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        // await fetchUsers(+event.selected + 1)

    };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setisShowModalDelete(true)


    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        if (response && response.EC === 0) {
            toast.success(response.EM)
            await fetchUsers()
            setisShowModalDelete(false)

        } else {
            toast.error(response.EM)
        }
    }

    const handleClose = () => {
        setisShowModalDelete(false)
        setDataModal({})

    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUsers()
    }

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }

    const handleRefresh = async () => {
        await fetchUsers()
    }

    return (
        <>
            <div className="container">
                <div className="manager-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3 className="mt-3">Table Users</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success mt-3 mb-3 me-2"
                                onClick={() => handleRefresh()}
                            ><i class="fa fa-refresh me-2"></i>Refesh</button>
                            <button className="btn btn-primary mt-3 mb-3" onClick={() => {
                                setIsShowModalUser(true);
                                setActionModalUser('CREATE')
                            }}
                            ><i class="fa fa-plus-circle me-2"></i>Add user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ? <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button style={{ marginRight: '3px' }} className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    ><i class="fa fa-trash me-2"></i>Delete</button>
                                                    <button className="btn btn-success" onClick={() => handleEditUser(item)}><i class="fa fa-pencil-square-o me-2"></i>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </> : <><tr><td>Not found users</td></tr></>}
                            </tbody>
                        </table>
                    </div>
                    {
                        totalPages > 0 &&

                        < div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }


                </div>

            </div >
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            ></ModalDelete>
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            ></ModalUser>
        </>
    )
}

export default Users