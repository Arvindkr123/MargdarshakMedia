import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAddAccountApiCall from "../api/useAddAccountApiCall";

const AddAccount = () => {
  const navigate = useNavigate();
  const [accountsDetails, setAccountsDetails] = useState({
    accountId: "",
    introducerId: "",
  });

  const { addAccount, loading, error, data } = useAddAccountApiCall();

  // If the data or response from API is available, navigate back
  useEffect(() => {
    if (data) {
      navigate("/"); // Redirect after account is successfully added
    }
  }, [data, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (accountsDetails.accountId === "") {
      alert("Please enter account id");
      return;
    }
    if (accountsDetails.introducerId === "") {
      alert("Please enter introducer id");
      return;
    }

    // Trigger the API call by updating state
    addAccount({
      accountId: accountsDetails.accountId,
      introducerId: accountsDetails.introducerId,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add Account</h1>
      {error && <h4 className="text-red-500 bg-black p-4">{error}</h4>}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label
            htmlFor="accountId"
            className="block text-sm font-semibold text-gray-700"
          >
            Account Id
          </label>
          <input
            type="text"
            id="accountId"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter account Id"
            value={accountsDetails.accountId}
            onChange={(e) =>
              setAccountsDetails((prev) => ({
                ...prev,
                accountId: e.target.value,
              }))
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="introducerId"
            className="block text-sm font-semibold text-gray-700"
          >
            Introducer Id
          </label>
          <input
            type="text"
            id="introducerId"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Introducer Id"
            value={accountsDetails.introducerId}
            onChange={(e) =>
              setAccountsDetails((prev) => ({
                ...prev,
                introducerId: e.target.value,
              }))
            }
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Adding..." : "Add Account"}
        </button>
      </form>
    </div>
  );
};

export default AddAccount;
