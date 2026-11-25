
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentDetails.css";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/students"
  : "https://nurture-grow-backend.onrender.com/api/students";

const FEE_API = import.meta.env.DEV
  ? "http://localhost:5000/api/student-fees"
  : "https://nurture-grow-backend.onrender.com/api/student-fees";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [feeData, setFeeData] = useState(null);
  const [baseFee, setBaseFee] = useState("");
  const [discount, setDiscount] = useState("0");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const token = sessionStorage.getItem("adminToken");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const fetchDetails = async () => {
    try {
      const studentResponse = await fetch(`${API_URL}/${id}`, { headers });
      const studentData = await studentResponse.json();

      if (!studentResponse.ok) {
        throw new Error(studentData.message || "Student not found");
      }

      setStudent(studentData);

      const feeResponse = await fetch(`${FEE_API}/${id}`, { headers });
      const feeResult = await feeResponse.json();

      if (feeResponse.status === 404) {
        setFeeData(null);
      } else if (!feeResponse.ok) {
        throw new Error(feeResult.message || "Could not fetch fees");
      } else {
        setFeeData(feeResult);
        setBaseFee(String(feeResult.feeRecord.baseFee));
        setDiscount(String(feeResult.feeRecord.discount));
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const saveFees = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${FEE_API}/${id}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          baseFee: Number(baseFee),
          discount: Number(discount)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      await fetchDetails();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const addPayment = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${FEE_API}/${id}/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          amount: Number(amount),
          paymentMode,
          note
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAmount("");
      setNote("");
      setMessage(data.message);
      await fetchDetails();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const getReceiptDetails = () => {
    if (!feeData || !selectedReceipt) return null;

    const payments = feeData.feeRecord.payments;
    const index = payments.findIndex(
      (payment) => payment._id === selectedReceipt
    );

    if (index === -1) return null;

    const payment = payments[index];

    const previousPaid = payments
      .slice(0, index)
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const paidTillNow = previousPaid + Number(payment.amount);

    return {
      payment,
      previousBalance: Math.max(0, totalFees - previousPaid),
      remainingBalance: Math.max(0, totalFees - paidTillNow)
    };
  };

  if (loading) return <p>Loading student details...</p>;
  if (!student) return <p>{message || "Student not found"}</p>;

  const totalPaid = feeData?.totalPaid || 0;
  const totalFees = feeData?.feeRecord?.totalFees || 0;
  const balance = feeData?.balance || 0;
  const receiptDetails = getReceiptDetails();

  return (
    <div className="student-details-page">
      <button
        className="student-back-btn"
        onClick={() => navigate("/admin/students")}
      >
        ← Back to Students
      </button>

      <h2>Student Profile</h2>

      {message && <p className="student-fee-message">{message}</p>}

      <div className="student-profile-card">
        <h3>{student.name}</h3>

        <div className="student-profile-grid">
          <div>
            <span>Admission Number</span>
            <p>{student.admissionNumber}</p>
          </div>

          <div>
            <span>Class</span>
            <p>{student.className}</p>
          </div>

          <div>
            <span>Section</span>
            <p>{student.section || "Not provided"}</p>
          </div>

          <div>
            <span>Date of Birth</span>
            <p>
              {student.dateOfBirth
                ? new Date(student.dateOfBirth).toLocaleDateString()
                : "Not provided"}
            </p>
          </div>

          <div>
            <span>Parent Name</span>
            <p>{student.parentName || "Not provided"}</p>
          </div>

          <div>
            <span>Phone</span>
            <p>{student.phone || "Not provided"}</p>
          </div>

          <div>
            <span>Admission Date</span>
            <p>
              {student.admissionDate
                ? new Date(student.admissionDate).toLocaleDateString()
                : "Not provided"}
            </p>
          </div>

          <div className="student-address">
            <span>Address</span>
            <p>{student.address || "Not provided"}</p>
          </div>
        </div>
      </div>

      <div className="student-fees-section">
        <h3>Fees Management</h3>

        <form className="student-fee-form" onSubmit={saveFees}>
          <h4>Set Student Fees</h4>

          <label>Base Fee (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={baseFee}
            onChange={(e) => setBaseFee(e.target.value)}
            required
          />

          <label>Discount / Concession (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />

          <div className="student-final-fee">
            Final Fees: {formatCurrency(
              Math.max(0, (Number(baseFee) || 0) - (Number(discount) || 0))
            )}
          </div>

          <button type="submit">Save Fees</button>
        </form>

        {feeData && (
          <>
            <div className="student-fee-summary">
              <div>
                <span>Total Fees</span>
                <h3>{formatCurrency(totalFees)}</h3>
              </div>

              <div>
                <span>Paid Amount</span>
                <h3>{formatCurrency(totalPaid)}</h3>
              </div>

              <div>
                <span>Remaining Balance</span>
                <h3>{formatCurrency(balance)}</h3>
              </div>
            </div>

            <form className="student-payment-form" onSubmit={addPayment}>
              <h4>Record New Payment</h4>

              <label>Payment Amount (₹)</label>
              <input
                type="number"
                min="0.01"
                max={balance}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <label>Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Other">Other</option>
              </select>

              <label>Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Payment note"
              />

              <button type="submit" disabled={balance <= 0}>
                Record Payment
              </button>
            </form>

            <div className="student-payment-history">
              <h4>Payment History</h4>

              {feeData.feeRecord.payments.length === 0 ? (
                <p>No payments recorded yet.</p>
              ) : (
                <div className="students-table-wrapper">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Mode</th>
                        <th>Note</th>
                        <th>Receipt No.</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>

                    <tbody>
                      {feeData.feeRecord.payments.map((payment) => (
                        <tr key={payment._id}>
                          <td>
                            {new Date(payment.paymentDate).toLocaleDateString()}
                          </td>
                          <td>{formatCurrency(payment.amount)}</td>
                          <td>{payment.paymentMode}</td>
                          <td>{payment.note || "-"}</td>
                          <td>{payment.receiptNumber || "Old Payment"}</td>
                          <td>
                            <button
                              type="button"
                              className="student-receipt-btn"
                              onClick={() => setSelectedReceipt(payment._id)}
                            >
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {receiptDetails && (
              <div className="student-receipt-section">
                <div className="receipt-print-area">
                  <div className="receipt-header">
                    <h2>Nurture and Grow Primary School</h2>
                    <p>Fee Payment Receipt</p>
                  </div>

                  <div className="receipt-number">
                    <strong>Receipt No:</strong>
                    <span>
                      {receiptDetails.payment.receiptNumber}
                    </span>
                  </div>

                  <div className="receipt-student-details">
                    <p><strong>Student Name:</strong> {student.name}</p>
                    <p><strong>Admission Number:</strong> {student.admissionNumber}</p>
                    <p><strong>Class:</strong> {student.className} {student.section}</p>
                    <p><strong>Parent Name:</strong> {student.parentName}</p>
                  </div>

                  <div className="receipt-payment-details">
                    <h4>Payment Details</h4>
                    <p>
                      <strong>Payment Date:</strong>{" "}
                      {new Date(
                        receiptDetails.payment.paymentDate
                      ).toLocaleDateString("en-IN")}
                    </p>
                    <p>
                      <strong>Payment Mode:</strong>{" "}
                      {receiptDetails.payment.paymentMode}
                    </p>
                    <p>
                      <strong>Amount Paid:</strong>{" "}
                      {formatCurrency(receiptDetails.payment.amount)}
                    </p>
                    <p>
                      <strong>Previous Balance:</strong>{" "}
                      {formatCurrency(receiptDetails.previousBalance)}
                    </p>
                    <p>
                      <strong>Remaining Balance:</strong>{" "}
                      {formatCurrency(receiptDetails.remainingBalance)}
                    </p>
                    <p>
                      <strong>Note:</strong>{" "}
                      {receiptDetails.payment.note || "-"}
                    </p>
                  </div>

                  <div className="receipt-footer">
                    <p>Thank you for your payment!</p>
                    <p>Authorized Signature: __________________</p>
                  </div>
                </div>

                <div className="receipt-actions">
                  <button
                    type="button"
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedReceipt(null)}
                  >
                    Close Receipt
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!feeData && (
          <p className="student-no-fees">
            Save the student's fees to start recording payments.
          </p>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;