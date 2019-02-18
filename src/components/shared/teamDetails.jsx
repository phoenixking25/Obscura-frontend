import React from 'react';
import Requests from '../dashboard/requests';
import BarChart from './graph';
import Loader from './loader';

const TeamDetails = (props) => {
  const {
    team, requests, hidden, socket,
  } = props;
  if (team) {
    return (
      <div className="row fade">
        <div className="col s12 center">
          <img src={team.picture} alt="" className="circle responsive-img" width="15%" />
          <h5>
            {' '}
            Team
            {' '}
            <b>
              {team.name}
            </b>
          </h5>
          <div className="row">
            <div className="col s12">

              <div className="card z-index-4">
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header grey darken-3 white-text">
                      <i className="material-icons">
                        group
                      </i>
                      Team Members (
                      {team.players.length}
                      )
                    </div>
                  </li>
                </ul>

                <table className="highlight centered responsive-table">
                  <thead>
                    <tr>
                      <th>
                        Avatar
                      </th>
                      <th>
                        Player Username
                      </th>
                      <th>
                        Level Cleared
                      </th>
                    </tr>
                  </thead>

                  {team.players.map(p => (
                    <tbody key={p.username}>
                      <tr>
                        <td>
                          <img src={p.picture} alt="player_avatar" width="65" className="responsive-img circle" />
                        </td>
                        <td>
                          {p.username}
                        </td>
                        <td>
                          {p.level_cleared}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>

            </div>
          </div>
        </div>

        <div className="col s12">
          <BarChart players={team.players} />
        </div>

        {requests}
        <div className={hidden ? 'hide' : ''}>
          <div className="col s12">
            <Requests requests={team.requests} socket={socket} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Loader />
    </div>
  );
};

export default TeamDetails;
