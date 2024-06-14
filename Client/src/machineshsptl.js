import React from 'react';
import MachinesByHospital from './machinecards';
import './card.css'
import Navbar from './Navbar';
const Machine = () => {
    // Replace with actual hospitalId you want to fetch machines for
    const hospitalId = localStorage.getItem('id');

    return (
        <div>
        <Navbar />

        <div className="card-left-right">
            <MachinesByHospital hospitalId={hospitalId} />
        </div>
        </div>
    );
};

export default Machine;
