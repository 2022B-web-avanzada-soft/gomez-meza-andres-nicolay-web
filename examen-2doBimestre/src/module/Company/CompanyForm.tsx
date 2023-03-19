import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Input } from "../../components/Input";
import { ApiStatus, IUpdateCompanyActionProps, ICompanyForm } from "./Company.type";
import Style from "./CompanyFormStyle.module.css";
import {
    createCompanyAction,
    resetCreateListStatus,
    updateCompanyAction,
} from "./CompanySlice";
import { useParams } from "react-router-dom";
import {toastError} from "../../components/ToastifyConfig";

interface IProps {
    isEditForm?: boolean;
}

const CompanyForm = (props: IProps) => {
    const { isEditForm } = props;
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [employees, setEmployees] = useState(0);
    const [website, setWebsite] = useState("");
    const [president, setPresident] = useState("");

    const params = useParams();
    const companyIdToEdit = useRef(parseInt(params.id || ""));

    const { list } = useAppSelector((state: RootState) => state.company);

    useEffect(() => {
        if (isEditForm && companyIdToEdit.current) {
            const companyData = list.filter((x) => x.id === companyIdToEdit.current);

            if (companyData.length) {
                setName(companyData[0].name);
                setCity(companyData[0].city);
                setEmployees(companyData[0].employees);
                setWebsite(companyData[0].website);
                setPresident(companyData[0].president);
            }
        }
    }, [isEditForm]);

    const { createCompanyFormStatus, updateCompanyFormStatus } = useAppSelector(
        (state: RootState) => state.company
    );
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data: ICompanyForm = { name, city, employees, website, president };

        if (name && city && employees && website && president) {
            if (isEditForm) {
                const dirtyFormData: IUpdateCompanyActionProps = {
                    id: companyIdToEdit.current,
                    data,
                };
                dispatch(updateCompanyAction(dirtyFormData));
            } else {
                const data: ICompanyForm = { name, city, employees, website, president };
                dispatch(createCompanyAction(data));
            }
        } else {
            toastError("Please fill the form");
        }
    };

    useEffect(() => {
        if (createCompanyFormStatus === ApiStatus.success) {
            setName("");
            setCity("");
            setEmployees(0);
            setWebsite("");
            setPresident("");
            dispatch(resetCreateListStatus());
        }
    }, [createCompanyFormStatus]);

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
                    label="City"
                    value={city}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCity(e.target.value);
                    }}
                />
                <Input
                    label="Employees"
                    value={employees.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmployees(parseInt(e.target.value));
                    }}
                />
                <Input
                    label="WebSite"
                    value={website}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setWebsite(e.target.value);
                    }}
                />
                <Input
                    label="President"
                    value={president}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPresident(e.target.value);
                    }}
                />
                <div className={Style["btn-wrapper"]}>
                    <input
                        type="submit"
                        value={isEditForm ? "Update" : "Create"}
                        disabled={
                            createCompanyFormStatus === ApiStatus.loading ||
                            updateCompanyFormStatus === ApiStatus.loading
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default CompanyForm;