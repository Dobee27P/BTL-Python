$(document).ready(function () {
    $.post("api.aspx", {
        action: "thongke"
    }, function (data) {
        // Xử lý dữ liệu JSON nhận được
        console.log(data); // Ví dụ: in ra console

        // Chuyển đổi dữ liệu JSON thành mảng các đối tượng TeamStanding
        var teamStandings = JSON.parse(data);

        // Tạo mảng các màu sắc cho các cột biểu đồ
        var colors = ['#FF5733', '#C70039', '#900C3F', '#581845', '#2F4F4F', '#1E90FF'];

        // Tạo bảng HTML
        var tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Mảng để lưu tên đội và điểm số cho biểu đồ
        var teams = [];
        var points = [];

        // Lặp qua mỗi phần tử trong mảng dữ liệu
        teamStandings.forEach((item, index) => {
            tableHtml += `
                <tr class="team-row" data-index="${index}" data-wins="${item.wins}" data-losses="${item.losses}" data-WinPercentage"${item.WinPercentage}" data-GamesBehind"${item.GamesBehind}" data-Conference="${item.Conference}" data-Division"${item.Division}">
                    <td>${item.team}</td>
                    <td>${item.points}</td>
                    <td>${item.rank}</td>
                </tr>
            `;
            teams.push(item.team);
            points.push(item.points);
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        // Đưa bảng HTML vào một div có id là "table-container"
        $('#table-container').html(tableHtml);

        // Vẽ biểu đồ
        var ctx = document.getElementById('pointsChart').getContext('2d');
        var pointsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: teams,
                datasets: [{
                    label: 'Points',
                    data: points,
                    backgroundColor: colors,
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Tắt tự động điều chỉnh kích thước
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false // Ẩn chú thích
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: Math.round,
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        });

        // Xử lý sự kiện mouseenter và mouseleave cho các dòng trong bảng
        $('.team-row').mouseenter(function () {
            // Lấy thông tin về số trận thắng, số trận hòa, số trận thua, số trận đã đấu và số trận còn lại từ thuộc tính data của dòng được hover
            var TeamID = $(this).find('td:first-child').text(); // Lấy thông tin đội từ cột đầu tiên của dòng
            var TeamName = $(this).data('TeamName');
            var Wins = $(this).data('Wins');
            var Losses = $(this).data('Losses');
            var WinPercentage = $(this).data('WinPercentage');
            var GamesBehind = $(this).data('GamesBehind');
            var Conference = $(this).data('Conference');
            var Division = $(this).data('Division');

            // Tạo bảng HTML để hiển thị thông tin chi tiết của đội
            var teamInfoHtml = `
        <table>
            <tr>
                <td>TeamID:</td>
                <td>${TeamID}</td>
            </tr>
            <tr>
                <td>TeamName:</td>
                <td>${TeamName}</td>
            </tr>
            <tr>
                <td>Wins:</td>
                <td>${Wins}</td>
            </tr>
            <tr>
                <td>Losses:</td>
                <td>${Losses}</td>
            </tr>
            <tr>
                <td>WinPercentage:</td>
                <td>${WinPercentage}</td>
            </tr>
            <tr>
                <td>GamesBehind:</td>
                <td>${GamesBehind}</td>
            </tr>
            <tr>
                <td>Conference:</td>
                <td>${Conference}</td>
            </tr><tr>
            <td>Division:</td>
            <td>${Division}</td>
        </tr>
        </table>`;

            // Hiển thị thông tin chi tiết của đội trong div có id "team-details"
            $('#team-details').html(teamInfoHtml).show();

            // Thêm lớp để đổi màu nền của dòng khi hover
            $(this).addClass('team-row-hover');
        }).mouseleave(function () {
            // Ẩn thông tin chi tiết khi chuột rời khỏi dòng
            $('#team-details').hide();

            // Xóa lớp đổi màu nền của dòng khi chuột rời khỏi dòng
            $(this).removeClass('team-row-hover');
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Request failed: " + textStatus + ", " + errorThrown);
        $('#table-container').html("An error occurred while loading data.");
    });
});
