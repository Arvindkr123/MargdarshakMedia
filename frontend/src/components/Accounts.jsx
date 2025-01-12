import React, { useEffect } from "react";
import { useApiCall } from "../api/useApiCall";

const Accounts = () => {
  let { data, loading } = useApiCall();
  // console.log(data?.data);

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg p-5">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Account ID</th>
            <th className="py-3 px-6 text-left">Introducer ID</th>
            <th className="py-3 px-6 text-left">Beneficiary ID</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading && <h4 className="text-center mt-7">Loading.....</h4>}

          {data?.data?.length > 0 ? (
            data?.data?.map((accountInfo, index) => (
              <tr key={index}>
                <td className="py-3 px-6">{accountInfo?.accountId}</td>
                <td className="py-3 px-6">{accountInfo?.introducerId}</td>
                <td className="py-3 px-6">{accountInfo?.beneficiaryId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-6 text-center">
                No accounts added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
