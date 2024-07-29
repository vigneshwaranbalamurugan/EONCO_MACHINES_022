import React, { useState, useEffect } from 'react';
import '../styles/card.css';
import Loader from './Loader';
import ConfirmationPopup from './confirmationPopup';
import { useToast } from './toaster';
import { useAuth } from './authContext';


const MachinesByHospital = ({ hospitalId }) => {
    const [machines, setMachines] = useState([]);
    const [editId, setEditId] = useState(null);
    const [deleteId,setDeleteId] =  useState(null);
    const [newPreventiveMaintenance, setNewPreventiveMaintenance] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [showcPopup, setcShowPopup] = useState(false);
    const [showdPopup, setdShowPopup] = useState(false);
    const { userRole } = useAuth();
    const setToastData = useToast();

    useEffect(() => {
        if (!userRole) {
            return;
        }

        const fetchMachines = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/equip/machines/${hospitalId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch machines');
                }
                const data = await response.json();
                setMachines(data);
            } catch (error) {
                console.error('Error fetching machines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMachines();
    }, [hospitalId, userRole]);

    const handleUpdateClick = async (machineId) => {
        setcShowPopup(false);
        setLoading(true);
        try {
            const response = await fetch(`/equip/update/${machineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Preventive_Maintanence: newPreventiveMaintenance }),
            });
            if (!response.ok) {
                throw new Error('Failed to update machine');
            }
            const result = await response.json();
            setToastData({ status:'success', message: result.message });
            const updatedMachines = machines.map(machine => {
                if (machine._id === machineId) {
                    return { ...machine, Preventive_Maintanence: newPreventiveMaintenance };
                }
                return machine;
            });
            setMachines(updatedMachines);
            setEditId(null); // Reset edit state
            setNewPreventiveMaintenance('');
        } catch (error) {
            console.error('Error updating machine:', error);
            setToastData({status:'failure', message: error});
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = async (machineId) => {
        setdShowPopup(false);
            setLoading(true);
            try {
                const response = await fetch(`/equip/delete/${machineId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete machine');
                }
                const result = await response.json();
                setToastData({ status:'success', message: result.message});
                const updatedMachines = machines.filter(machine => machine._id !== machineId);
                setMachines(updatedMachines);
            } catch (error) {
                console.error('Error deleting machine:', error);
                setToastData({ status:'failure', message: error });
            } finally {
                setLoading(false);
            }
        
    };

    const handleEditClick = (machineId, currentPreventiveMaintenance) => {
        setEditId(machineId);
        setNewPreventiveMaintenance(currentPreventiveMaintenance);
    };

    const handleCancelClick = () => {
        setEditId(null);
        setcShowPopup(false);
        setNewPreventiveMaintenance('');
    };

    const handleDeleteConfirm =(machineId) =>{
        setdShowPopup(true);
        setDeleteId(machineId);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMachines = machines.filter(machine =>
        machine.Macine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.make.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {loading && <Loader />}
            {showcPopup && (
                <ConfirmationPopup
                    message={`You want to update the machine!`}
                    icon="&#128259;"
                    custom="Update"
                    onCancel={handleCancelClick}
                    onConfirm={()=>handleUpdateClick(editId)}
                />
            )}
             {showdPopup && (
                <ConfirmationPopup
                    message={`You want to delete the machine!`}
                    icon="&#128465;"
                    custom="Delete"
                    onCancel={() => setdShowPopup(false)}
                    onConfirm={()=>handleDeleteClick(deleteId)}
                />
            )}
            <h2>Machines at Hospital</h2>


            <div className="machine-cards">
                <input
                    type="text"
                    placeholder="Search by name or make"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {filteredMachines.map((machine) => (
                    <div key={machine._id} className="machine-card">
                        <h3>{machine.Macine_name}</h3>
                        <p><strong>Make:</strong><span>{machine.make}</span></p>
                        <p><strong>Treatment Type:</strong><span>{machine.treate_type}</span></p>
                        <p><strong>Machine Protocol:</strong><span>{machine.machine_prtocl}</span></p>
                        <p><strong>Machine Type:</strong><span>{machine.machine_type}</span></p>
                        <p><strong>Count:</strong><span>{machine.count}</span></p>
                        <p><strong>Date of Manufacture:</strong><span>{new Date(machine.dateOfManufacture).toLocaleDateString()}</span></p>
                        <p><strong>Purchase Date:</strong><span>{new Date(machine.purchaseDate).toLocaleDateString()}</span></p>
                        <p><strong>Warranty Date:</strong><span>{new Date(machine.warrantyDate).toLocaleDateString()}</span></p>
                        {editId === machine._id ? (
                            <div>
                                <label htmlFor="newPreventiveMaintenance"><strong>New Preventive Maintenance:</strong></label>
                                <input
                                    type="text"
                                    id="newPreventiveMaintenance"
                                    value={newPreventiveMaintenance}
                                    onChange={(e) => setNewPreventiveMaintenance(e.target.value)}
                                />
                                <div className="btn-container">
                                    <button onClick={() => setcShowPopup(true)} className="update-btn">Update</button>
                                    <button onClick={handleCancelClick}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Preventive Maintenance:</strong><span>{machine.Preventive_Maintanence}</span></p>
                                {(userRole === 'Admin' || userRole === 'Manager') && (

                                    <div className="btn-container">
                                        <button onClick={() => handleEditClick(machine._id, machine.Preventive_Maintanence)} className="update-btn">Edit</button>
                                        <button onClick={() => handleDeleteConfirm(machine._id)} className="delete-btn">Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                ))}
            </div>
        </div>
    );
};

export default MachinesByHospital;