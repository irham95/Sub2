function showStanding(data) {
    let standingEl = '';
    data.standings[0].table.forEach(klasemen => {
        standingEl += `
            <tr>
                <td class="bold">${klasemen.position}</td>
                <td class="flex-standing">
                    <img class="mr-10" src="${klasemen.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo" width="30">
                    <a class="black-text bold">${klasemen.team.name}</a>
                </td>
                <td class="black-text bold">${klasemen.playedGames}</td>
                <td class="black-text bold">${klasemen.won}</td>
                <td class="black-text bold">${klasemen.draw}</td>
                <td class="black-text bold">${klasemen.lost}</td>
                <td class="black-text bold">${klasemen.goalsFor}</td>
                <td class="black-text bold">${klasemen.goalsAgainst}</td>
                <td class="black-text bold">${klasemen.goalDifference}</td>
                <td class="black-text bold">${klasemen.points}</td>
                
            </tr>
        `;
    });
    document.getElementById('table-body').innerHTML = standingEl;
    document.getElementById('preloader').innerHTML = '';
}


function showMatches(data) {
    let matchEl = '';
    
    data.matches.forEach(pertandingan => {
        let score = '-';
        let status = 'Postponed';
        let statusClass = '';

        if (pertandingan.status === "FINISHED") {
            score = `${pertandingan.score.fullTime.homeTeam} - ${pertandingan.score.fullTime.awayTeam}`;
            status = 'Full Time';
            statusClass = 'black';
        } else if(pertandingan.status === "POSTPONED") {
            score = '-';
            statusClass = 'red';
        } else {
            status = `${new Date(match.utcDate).toLocaleDateString()}`;
            statusClass = 'text-bold status-match-padding';
        }

        matchEl += `
            <a class="modal-trigger black-text" href="#modal1" onclick="getMatchById(${pertandingan.id})">
                <div class="card-table row s11 m6 red lighten-5 match-padding card-match">
                    <div <td class="black-text bold">${pertandingan.homeTeam.name}</div>
                    <div <td class="black-text bold">${score}</div>
                    <div <td class="black-text bold">${pertandingan.awayTeam.name}</div>
                </div>
            </a>
        `;

        document.getElementById('btn-matchday').innerHTML = `
            <div class="flex">
                Matchday ${pertandingan.matchday}
                <i class="material-icons ml-10">done_outline</i>
            </div>
        `;
    });

    document.getElementById('list-matches').innerHTML = matchEl;
    document.getElementById('preloader').innerHTML = '';

    const dropDown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDown);

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let listDropdown = '';
    for (let i = 1; i <= 38; i++) {
        listDropdown += `<li><a onclick="getAllMatches(${i})">${i}</a></li>`;
    }
    document.getElementById('dropdown1').innerHTML = listDropdown;
    
}

function showModals(match) {
    let modals = '';
    let score = '-';
    let status = 'Postponed';
    let statusClass = '';

    if (match.status === "FINISHED") {
        score = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
        status = 'Full Time';
        statusClass = 'black';
    } else if(match.status === "POSTPONED") {
        score = '-';
        statusClass = 'red';
    } else {
        status = '';
    }

    modals = `
        <div class="modal-content">
            <div class="center-align section">
                <strong class="p-4 white-text ${statusClass}">${status}</strong>
            </div>
            <div class="row center-align">
                <div class="col s12 m5">
                    <strong>${match.homeTeam.name}</strong>
                </div>
                <div class="col s1 push-s5 m2">
                    <strong>${score}</strong>
                </div>
                <div class="col s12 m5">
                    <strong>${match.awayTeam.name}</strong>
                </div>
            </div>
            <div class="center-align">
                <class="flex"><i class="tiny material-icons">place</i>${match.venue}</class>
                <class="flex"><i class="tiny material-icons">assignment</i>${match.stage}</class>
                <p><class="flex"><i class="tiny material-icons">event_available</i>${match.status}</class><p>
            </div>
        </div>
        <div class="section center-align mr-10">
            <button id="save-match" class="waves-effect waves-light btn-flat red lighten-1 white-text">Simpan</button>
            <button id="back" class="waves-effect waves-light btn-flat yellow lighten-1 white-text"><a href="index.html">Kembali</button>
        </div>
    `;

    document.getElementById('modal1').innerHTML = modals;

    document.getElementById('save-match').onclick = () => {
        dbInsertMatch(match);
        const modals = document.querySelector('.modal');
        
    }
}



function showAllSaved() {
    dbGetAllMatches().then(matches => {
        let listMatch = '';
        if (matches.length === 0) listMatch = `<h6 class="center">Data Tidak Ditemukan!</h6>`;

        matches.forEach(match => {
            let score = '-';
            let status = 'Postponed';
            let statusClass = '';

            if (match.status === "FINISHED") {
                score = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
                status = 'Full Time';
                statusClass = 'black';
            } else if(match.status === "POSTPONED") {
                score = '-';
                statusClass = 'red';
            } else {
                status = '';
            }

            listMatch += `
                <div class="card">
                    <div class="section center-align">
                        <strong class="p-4 white-text ${statusClass}">${status}</strong>
                    </div>
                    <div class="row center-align">
                        <div class="col s12 m5">
                            <strong>${match.homeTeam.name}</strong>
                        </div>
                        <div class="col s1 push-s5 m2">
                            <strong>${score}</strong>
                        </div>
                        <div class="col s12 m5">
                            <strong>${match.awayTeam.name}</strong>
                        </div>
                    </div>
                    <div class="center-align">
                <class="flex"><i class="tiny material-icons">place</i>${match.venue}</class>
                <class="flex"><i class="tiny material-icons">assignment</i>${match.stage}</class>
                <p><class="flex"><i class="tiny material-icons">event_available</i>${match.status}</class><p>
                </div>
                    <div class="section center-align mr-10">
                        <a id="delete-match" class="waves-effect waves-light btn-flat red lighten-1 white-text" onclick="dbDeleteMatch(${match.id})">Hapus</a>
                    </div>
                </div>
            `;
        });

        document.getElementById('match-saved').innerHTML = listMatch;
        document.getElementById('preloader').innerHTML = '';
    });
}


function toast(text) {
    return M.toast({html: `<p class="center white-text text-lighten-2">${text}</p>`, classes: 'blue darken-4'});
}

const preLoader = 
`<div class="preloader-wrapper big active">
    
        <div class="circle-clipper right">
            <div class="circle"></div>
        </div>
        <div class="gap-patch">
            <div class="circle"></div>
        </div>
        <div class="circle-clipper left">
            <div class="circle"></div>
        </div>
    </div>
</div>`;
