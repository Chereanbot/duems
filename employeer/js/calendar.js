// Calendar Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Schedule Calendar
    initializeScheduleCalendar();
    
    // Initialize Leave Calendar
    initializeLeaveCalendar();
});

// Schedule Calendar
function initializeScheduleCalendar() {
    const calendarEl = document.getElementById('scheduleCalendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        events: [
            {
                title: 'Teaching',
                start: '2024-02-19T08:00:00',
                end: '2024-02-19T12:00:00',
                backgroundColor: '#28a745',
                classNames: ['teaching-event']
            },
            {
                title: 'Office Hours',
                start: '2024-02-19T13:00:00',
                end: '2024-02-19T16:00:00',
                backgroundColor: '#007bff',
                classNames: ['office-hours-event']
            },
            {
                title: 'Department Meeting',
                start: '2024-02-22T10:00:00',
                end: '2024-02-22T11:30:00',
                backgroundColor: '#ffc107',
                classNames: ['meeting-event']
            }
            // Add more events as needed
        ],
        eventClick: function(info) {
            showEventDetails({
                title: info.event.title,
                date: info.event.start.toLocaleString(),
                location: info.event.extendedProps.location || 'TBD',
                description: info.event.extendedProps.description || 'No description available'
            });
        },
        eventDidMount: function(info) {
            // Add tooltips to events
            new bootstrap.Tooltip(info.el, {
                title: `${info.event.title}\n${info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        }
    });

    calendar.render();
}

// Leave Calendar
function initializeLeaveCalendar() {
    const calendarEl = document.getElementById('leaveCalendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },
        events: [
            {
                title: 'John Doe - Annual Leave',
                start: '2024-02-15',
                end: '2024-02-23',
                backgroundColor: '#28a745',
                classNames: ['approved-leave']
            },
            {
                title: 'Sarah Johnson - Sick Leave',
                start: '2024-02-01',
                end: '2024-02-03',
                backgroundColor: '#007bff',
                classNames: ['approved-leave']
            },
            {
                title: 'Your Leave Request (Pending)',
                start: '2024-03-15',
                end: '2024-03-23',
                backgroundColor: '#ffc107',
                classNames: ['pending-leave']
            }
            // Add more leave events as needed
        ],
        eventClick: function(info) {
            if (info.event.extendedProps.isUserLeave) {
                showLeaveDetails(info.event.extendedProps.leaveId);
            }
        },
        eventDidMount: function(info) {
            // Add tooltips to events
            new bootstrap.Tooltip(info.el, {
                title: `${info.event.title}\n${info.event.start.toLocaleDateString()} - ${info.event.end.toLocaleDateString()}`,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        }
    });

    calendar.render();
} 