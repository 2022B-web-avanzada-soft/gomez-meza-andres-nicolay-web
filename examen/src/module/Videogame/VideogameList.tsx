import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IVideogame } from "./Videogame.type";
import { useNavigate } from "react-router-dom";
import {deleteVideogameAction, getVideogameListAction} from "./VideogameSlice";
import {Modal} from "../../components/Modal";

const VideogameList = () => {
    const [videogameDataToView, setVideogameDataToView] = useState<IVideogame | null>(null);
    const { list, listStatus } = useAppSelector((state: RootState) => state.videogame);
    const dispatch = useAppDispatch();

    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getVideogameListAction());
    }, []);

    return (
        <>
            <table>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Director</th>
                    <th>Date</th>
                    <th>isMultiplayer</th>
                    <th>Action</th>
                </tr>
                {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
                {listStatus === ApiStatus.error && (
                    <tbody>Error while loading list</tbody>
                )}

                {listStatus === ApiStatus.ideal &&
                    list.map((videogame: IVideogame, index: number) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{videogame.name}</td>
                                <td>{videogame.gender}</td>
                                <td>{videogame.director}</td>
                                <td>{videogame.date}</td>
                                <td>{videogame.isMultiplayer? "Verdadero":"Falso"}</td>
                                <td>
                                    <div>
                                        <input
                                            type="button"
                                            value="View"
                                            onClick={() => {
                                                setVideogameDataToView(videogame);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Edit"
                                            onClick={() => {
                                                navigator(`/editVideogame/${videogame.id}`);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Delete"
                                            onClick={() => {
                                                dispatch(deleteVideogameAction(videogame.id));
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
            </table>
            {videogameDataToView && (
                <Modal
                    title="Videogame Details"
                    onClose={() => {
                        setVideogameDataToView(null);
                    }}
                >
                    <div>
                        <div>
                            <label> Name : {videogameDataToView.name}</label>
                        </div>
                        <div>
                            <label> Gender : {videogameDataToView.gender}</label>
                        </div>
                        <div>
                            <label> Director : {videogameDataToView.director}</label>
                        </div>
                        <div>
                            <label> Date :{videogameDataToView.date}</label>
                        </div>
                        <div>
                            <label> isMultiplayer : {videogameDataToView.isMultiplayer? "Verdadero":"Falso"}</label>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default VideogameList;