import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Input } from "../../components/Input";
import { ApiStatus, IUpdateVideogameActionProps, IVideogameForm } from "./Videogame.type";
import Style from "./VideogameFormStyle.module.css";
import {
    createVideogameAction,
    resetCreateListStatus,
    updateVideogameAction,
} from "./VideogameSlice";
import { useParams } from "react-router-dom";
import {toastError} from "../../components/ToastifyConfig";
import {getVideogameListApi} from "./VideogameService";

interface IProps {
    isEditForm?: boolean;
}

const VideogameForm = (props: IProps) => {
    const { isEditForm } = props;
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [director, setDirector] = useState("");
    const [date, setDate] = useState("");
    const [isMultiplayer, setIsMultiplayer] = useState({} as boolean);
    const [company, setCompany] = useState("");

    const params = useParams();
    const videogameIdToEdit = useRef(parseInt(params.id || ""));

    const { list } = useAppSelector((state: RootState) => state.videogame);

    useEffect(() => {
        if (isEditForm && videogameIdToEdit.current) {
            const videogameData = list.filter((x) => x.id === videogameIdToEdit.current);

            if (videogameData.length) {
                setName(videogameData[0].name);
                setGender(videogameData[0].gender);
                setDirector(videogameData[0].director);
                setDate(videogameData[0].date);
                setIsMultiplayer(videogameData[0].isMultiplayer);
                setCompany(videogameData[0].company);
            }
        }
    }, [isEditForm]);

    const { createVideogameFormStatus, updateVideogameFormStatus } = useAppSelector(
        (state: RootState) => state.videogame
    );
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data: IVideogameForm = { name, gender, director, date, isMultiplayer, company };

        if (name && gender && director && date && company) {
            if (isEditForm) {
                const dirtyFormData: IUpdateVideogameActionProps = {
                    id: videogameIdToEdit.current,
                    data,
                };
                dispatch(updateVideogameAction(dirtyFormData));
            } else {
                const data: IVideogameForm = { name, gender, director, date, isMultiplayer, company };
                dispatch(createVideogameAction(data));
            }
        } else {
            toastError("Please fill the form");
        }
    };

    useEffect(() => {
        if (createVideogameFormStatus === ApiStatus.success) {
            setName("");
            setGender("");
            setDirector("");
            setDate("");
            setIsMultiplayer({} as boolean);
            setCompany("");
            dispatch(resetCreateListStatus());
        }
    }, [createVideogameFormStatus]);

    return (
        <div className={Style.container}>
            <form className={Style.form} onSubmit={onSubmitForm}>
                <Input
                    label="Name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value);
                    }}
                />
                <Input
                    label="Gender"
                    value={gender}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setGender(e.target.value);
                    }}
                />
                <Input
                    label="Director"
                    value={director}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDirector(e.target.value);
                    }}
                />
                <Input
                    label="Date"
                    type="datetime-local"
                    value={date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDate(e.target.value);
                    }}
                />

                <div>
                    <label>Is Multiplayer : </label>
                    <input type="radio" id="true" name="isMultiplayer" value="true"
                           onClick={() => setIsMultiplayer(true)}></input>
                    <label htmlFor="true">True</label>
                    <input type="radio" id="false" name="isMultiplayer" value="false"
                           onClick={() => setIsMultiplayer(false)}></input>
                    <label htmlFor="false">False</label>
                </div>

                <Input
                    label="Company"
                    value={company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCompany(e.target.value);
                    }}
                />

                <div className={Style["btn-wrapper"]}>
                    <input
                        type="submit"
                        value={isEditForm ? "Update" : "Create"}
                        disabled={
                            createVideogameFormStatus === ApiStatus.loading ||
                            updateVideogameFormStatus === ApiStatus.loading
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default VideogameForm;