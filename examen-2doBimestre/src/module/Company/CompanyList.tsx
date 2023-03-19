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
                    list.map((company: ICompany, index: number) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{company.name}</td>
                                <td>{company.city}</td>
                                <td>{company.employees}</td>
                                <td><a href="#">{company.website}</a></td>
                                <td>{company.president}</td>
                                <td>
                                    <div>
                                        <input
                                            type="button"
                                            value="View"
                                            onClick={() => {
                                                setCompanyDataToView(company);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Edit"
                                            onClick={() => {
                                                navigator(`/editCompany/${company.id}`);
                                            }}
                                        />
                                        <input
                                            type="button"
                                            value="Delete"
                                            onClick={() => {
                                                dispatch(deleteCompanyAction(company.id));
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