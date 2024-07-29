import React from 'react';
import MachinesByHospital from './machinecards';
import '../styles/card.css';
const Machine = () => {
    // Replace with actual hospitalId you want to fetch machines for
    const hospitalId = localStorage.getItem('id');

    return (
        <div>
        <div className="card-left-right">
            <MachinesByHospital hospitalId={hospitalId} />
        </div>
        </div>
    );
};

export default Machine;
