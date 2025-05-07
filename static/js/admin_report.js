$(document).ready(function() {
    // --- Dummy Data (Replace with actual API calls) ---
    const overallStats = {
        totalApplications: 150,
        totalApprovedLoans: 100,
        totalRejectedLoans: 50,
        totalOutstandingAmount: 550000.75
    };

    const allRepayments = [
        { repaymentId: 201, applicationId: 101, dueDate: '2025-05-15', amountDue: 500.25, paymentDate: '2025-05-14', paymentStatus: 'COMPLETED' },
        { repaymentId: 202, applicationId: 101, dueDate: '2025-06-15', amountDue: 500.25, paymentDate: null, paymentStatus: 'PENDING' },
        { repaymentId: 203, applicationId: 102, dueDate: '2025-05-20', amountDue: 750.00, paymentDate: '2025-05-19', paymentStatus: 'COMPLETED' },
        { repaymentId: 204, applicationId: 103, dueDate: '2025-05-25', amountDue: 1000.00, paymentDate: null, paymentStatus: 'PENDING' }
    ];

    const customerPortfolio = [
        { customerId: 1, name: 'Alice Smith', email: 'alice.smith@example.com', totalActiveLoans: 1, totalOutstandingBalance: 10000.50 },
        { customerId: 2, name: 'Bob Johnson', email: 'bob.johnson@example.com', totalActiveLoans: 2, totalOutstandingBalance: 25000.00 },
        { customerId: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', totalActiveLoans: 0, totalOutstandingBalance: 0.00 }
    ];

    // Populate Overall Statistics
    $('#totalApplications').text(overallStats.totalApplications);
    $('#totalApprovedLoans').text(overallStats.totalApprovedLoans);
    $('#totalRejectedLoans').text(overallStats.totalRejectedLoans);
    $('#totalOutstandingAmount').text('₹' + overallStats.totalOutstandingAmount.toFixed(2));

    // Function to populate the Repayments Table
    function populateRepaymentsTable(repayments) {
        $('#allRepaymentsTableBody').empty();
        if (repayments.length > 0) {
            repayments.forEach(repayment => {
                $('#allRepaymentsTableBody').append(`
                    <tr>
                        <td>${repayment.repaymentId}</td>
                        <td>${repayment.applicationId}</td>
                        <td>${repayment.dueDate}</td>
                        <td>₹${repayment.amountDue.toFixed(2)}</td>
                        <td>${repayment.paymentDate || '-'}</td>
                        <td>${repayment.paymentStatus}</td>
                    </tr>
                `);
            });
            $('#noRepaymentsAdmin').hide();
        } else {
            $('#noRepaymentsAdmin').show();
        }
    }

    // Initial population of the Repayments Table
    populateRepaymentsTable(allRepayments);

    // Filter Repayments based on selected status
    $('#filterRepaymentsBtn').click(function() {
        const selectedStatus = $('#repaymentStatusFilter').val();
        let filteredRepayments = allRepayments;
        if (selectedStatus) {
            filteredRepayments = allRepayments.filter(repayment => repayment.paymentStatus === selectedStatus);
        }
        populateRepaymentsTable(filteredRepayments);
    });

    // Populate Customer Portfolio Table
    if (customerPortfolio.length > 0) {
        customerPortfolio.forEach(customer => {
            $('#customerPortfolioTableBody').append(`
                <tr>
                    <td>${customer.customerId}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.totalActiveLoans}</td>
                    <td>₹${customer.totalOutstandingBalance.toFixed(2)}</td>
                </tr>
            `);
        });
        $('#noCustomers').hide();
    } else {
        $('#noCustomers').show();
    }
});