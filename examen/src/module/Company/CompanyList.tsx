import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, ICompany } from "./Company.type";
import { useNavigate } from "react-router-dom";
import {deleteCompanyAction, getCompanyListAction} from "./CompanySlice";
import {Modal} from "../../components/Modal";

const CompanyList = () => {
    const [companyDataToView, setCompanyDataToView] = useState<ICompany | null>(null);
    const { list, listStatus } = useAppSelector((state: RootState) => state.company);
    const dispatch = useAppDispatch();

    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getCompanyListAction());
    }, []);

    return (
        <>
            <table>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Employees</th>
                    <th>WebSite</th>
                    <th>President</th>
                    <th>Action</th>
                </tr>
                {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
                {listStatus === ApiStatus.error && (
                    <tbody>Error while loading list</tbody>
                )}

                {listStatus === ApiStatus.ideal &&
                    list.map((user: ICompany, index: number) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.city}</td>
                                <td>{user.employees}</td>
                                <td><a href="#">{user.website}</a></td>
                                <td>{user.president}</td>
                                <td>
                                    <div>
                                        <input
                                            type="button"
                                            value="View"
                                            onClick={() => {
                                                setCompanyDataToView(user);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Edit"
                                            onClick={() => {
                                                navigator(`/editCompany/${user.id}`);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Delete"
                                            onClick={() => {
                                                dispatch(deleteCompanyAction(user.id));
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
            </table>
            {companyDataToView && (
                <Modal
                    title="Company Details"
                    onClose={() => {
                        setCompanyDataToView(null);
                    }}
                >
                    <div>
                        <div>
                            <label> Name : {companyDataToView.name}</label>
                        </div>
                        <div>
                            <label> City : {companyDataToView.city}</label>
                        </div>
                        <div>
                            <label> Employees : {companyDataToView.employees}</label>
                        </div>
                        <div>
                            <label> WebSite :<a href="#">{companyDataToView.website}</a></label>
                        </div>
                        <div>
                            <label> President : {companyDataToView.president}</label>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default CompanyList;