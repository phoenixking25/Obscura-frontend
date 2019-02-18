import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import actions from '../../actions';
import SweetAlert from '../shared/sweetAlert';

const Requests = (props) => {
  const {
    requests, acceptRequest, deleteRequest
  } = props;
  if (requests.length) {
    return (
      <div className="request-back fade">

        <h5>
          Team Requests
        </h5>

        <div className="card z-index-4">
          <ul className="collapsible">
            <li>
              <div className="collapsible-header grey darken-3 white-text">
                <i className="material-icons ">
                  face
                </i>
                Requests (
                {/* requests count */}
                {requests.length}
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
                  Username
                </th>
                <th />
                <th />
              </tr>
            </thead>

            <tbody>
              {requests.map(t => (
                <tr key={t.requester_id}>
                  <td>
                    <img className="responsive-img circle" src={t.picture} alt="avatar" width="45" />
                  </td>
                  <td>
                    {t.username}
                  </td>
                  <td>
                    <i
                      className="material-icons select-pointer"
                      onClick={
                        () => {
                          SweetAlert('Accepting the request!', 'success');
                          acceptRequest(t.requester_id);
                        }}
                    >
                      check
                    </i>
                  </td>
                  <td>
                    <i
                      className="material-icons select-pointer"
                      onClick={
                        () => {
                          SweetAlert('Deleting the request!', 'success');
                          deleteRequest(t.requester_id);
                        }
                      }
                    >
                      cancel
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    );
  }
  return (
    <div className="fade">
      <h6>
        There are no team joining requests at present
      </h6>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  acceptRequest: (requesterId) => {
    dispatch(actions.acceptRequest(requesterId));
  },
  deleteRequest: (requesterId) => {
    dispatch(actions.deleteRequest(requesterId));
  },
});


export default withRouter(connect(null, mapDispatchToProps)(Requests));
