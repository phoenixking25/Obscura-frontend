import React from 'react';
import PropTypes from 'prop-types';

const DisplayImage = (props) => {
  const { images } = props;
  const className = `col s${Math.floor(12 / images.length)}`;
  console.log(className);
  return (
    <div className="row">

      {images.map((Obj, i) => (
        <div key={i} className={className}>
          <img
            className="team-img"
            src={`images/team/${Obj.url}`}
            alt="team-pic"
          />
          <p>
            {Obj.name}
          </p>
        </div>
      ))}

    </div>
  );
};

const developersArray = [
  { name: 'Anuj Sharma', url: 'AnujSharma.jpg' },
  { name: 'Kartik Yadav', url: 'KartikYadav.jpg' },
  { name: 'Anshul Malik (The Great)', url: 'AnshulMalik.jpg' },
];
const architectArray1 = [
  { name: 'Sushant Adlakha', url: 'SushantAdla.jpg' },
  { name: 'Devayan Mishra', url: 'DevayanMishra.jpg' },
  { name: 'Prakhar Maheshwari', url: 'PrakharMaheshwari.jpg' },
  { name: 'Prashant Kumar', url: 'PrashantKumar.jpg' },
];

const architectArray3 = [
  { name: 'Rajan Nagpal', url: 'RajanNagpal.jpg' },
  { name: 'Saqib Kamal', url: 'SaqibKamal.jpg' },
  { name: 'Saurabh Nandedkar', url: 'SaurabhNandedkar.jpg' },
  { name: 'Shubhankar', url: 'Shubhankar.jpg' },
];

const architectArray2 = [
  { name: 'Tanvi Singhal', url: 'TanviSingla.jpg' },
  { name: 'Vedant Nepal', url: 'VedantNepal.jpg' },
  { name: 'Abhimanyu Singh', url: 'AbhimanyuSingh.jpg' },
  { name: 'Thorvi Ramteke', url: 'ThorviRamteke.jpg' },
  { name: 'Yaseen Gouse Samudri', url: 'YaseenGouseSamudri.jpg' },
];

const Team = () => (
  <div>
    <div className="row center">
      <div className="col s12">
        <h3>
        Meet the team behind ObscurA
        </h3>
      </div>
      <div className="row fade">
        <h5 style={{ marginBottom: '50px' }}>
      Developers
        </h5>
        <DisplayImage images={developersArray} />
        <h5 style={{ marginBottom: '50px' }}>
      Architects
        </h5>
        <DisplayImage images={architectArray1} />
        <DisplayImage images={architectArray3} />
        <DisplayImage images={architectArray2} />
      </div>
    </div>

  </div>
);

DisplayImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Team;
