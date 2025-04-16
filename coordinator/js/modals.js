// Modal Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Bootstrap modals
    var modals = [].slice.call(document.querySelectorAll('.modal'));
    modals.forEach(function(modal) {
        new bootstrap.Modal(modal);
    });

    // Schedule Page Modals
    initializeScheduleModals();
    
    // Leave Requests Page Modals
    initializeLeaveModals();
});

// Schedule Page Modal Functions
function initializeScheduleModals() {
    // View Month Modal
    document.querySelector('#viewMonthBtn')?.addEventListener('click', function() {
        var modal = new bootstrap.Modal(document.getElementById('monthViewModal'));
        modal.show();
    });

    // Shift Swap Request Modal
    document.querySelector('#requestShiftSwapBtn')?.addEventListener('click', function() {
        var modal = new bootstrap.Modal(document.getElementById('shiftSwapModal'));
        modal.show();
    });

    // Event Details Modal
    document.querySelectorAll('.view-event-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showEventDetails(eventId);
        });
    });
}

// Leave Requests Page Modal Functions
function initializeLeaveModals() {
    // View Leave Details Modal
    document.querySelectorAll('.view-leave-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const leaveId = this.getAttribute('data-leave-id');
            showLeaveDetails(leaveId);
        });
    });

    // Leave Policy Modal
    document.querySelectorAll('.view-policy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const policyType = this.getAttribute('data-policy-type');
            showLeavePolicy(policyType);
        });
    });
}

// Helper Functions
function showEventDetails(eventId) {
    // Simulated event data - In real application, this would come from an API
    const eventData = {
        title: 'Department Meeting',
        date: 'Thursday, 10:00 AM',
        location: 'Conference Room',
        description: 'Weekly department sync meeting to discuss ongoing projects and updates.',
        attendees: ['John Doe', 'Jane Smith', 'Robert Johnson']
    };

    document.getElementById('eventTitle').textContent = eventData.title;
    document.getElementById('eventDate').textContent = eventData.date;
    document.getElementById('eventLocation').textContent = eventData.location;
    document.getElementById('eventDescription').textContent = eventData.description;
    
    var modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    modal.show();
}

function showLeaveDetails(leaveId) {
    // Simulated leave data - In real application, this would come from an API
    const leaveData = {
        type: 'Annual Leave',
        startDate: '15 Mar 2024',
        endDate: '22 Mar 2024',
        days: 5,
        status: 'Pending',
        reason: 'Family vacation',
        attachments: ['vacation_plan.pdf']
    };

    document.getElementById('leaveType').textContent = leaveData.type;
    document.getElementById('leaveDates').textContent = `${leaveData.startDate} - ${leaveData.endDate}`;
    document.getElementById('leaveDays').textContent = leaveData.days;
    document.getElementById('leaveStatus').textContent = leaveData.status;
    document.getElementById('leaveReason').textContent = leaveData.reason;
    
    var modal = new bootstrap.Modal(document.getElementById('leaveDetailsModal'));
    modal.show();
}

function showLeavePolicy(policyType) {
    // Simulated policy data - In real application, this would come from an API
    const policies = {
        annual: {
            title: 'Annual Leave Policy',
            days: '20 days per year',
            description: 'Annual leave is provided to all permanent employees for vacation and personal time.',
            rules: [
                'Must be requested at least 2 weeks in advance',
                'Maximum 15 consecutive days',
                'Subject to department head approval',
                'Unused leaves can be carried forward (max 5 days)'
            ]
        },
        sick: {
            title: 'Sick Leave Policy',
            days: '10 days per year',
            description: 'Sick leave is provided for medical reasons and health-related appointments.',
            rules: [
                'Must notify supervisor as soon as possible',
                'Medical certificate required for 3+ consecutive days',
                'Cannot be carried forward to next year',
                'No encashment of unused sick leave'
            ]
        },
        study: {
            title: 'Study Leave Policy',
            days: '5 days per year',
            description: 'Study leave is provided for academic and professional development.',
            rules: [
                'Must be related to current role or career development',
                'Requires proof of enrollment/registration',
                'Subject to academic calendar',
                'Additional days may be granted for examinations'
            ]
        }
    };

    const policy = policies[policyType] || policies.annual;
    document.getElementById('policyTitle').textContent = policy.title;
    document.getElementById('policyDays').textContent = policy.days;
    document.getElementById('policyDescription').textContent = policy.description;
    
    const rulesList = document.getElementById('policyRules');
    rulesList.innerHTML = '';
    policy.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
    
    var modal = new bootstrap.Modal(document.getElementById('leavePolicyModal'));
    modal.show();
} 