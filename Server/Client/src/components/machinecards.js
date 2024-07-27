import React, { useState, useEffect } from 'react';
import '../styles/card.css';
import Loader from './Loader';
import { useToast } from './toaster';

const MachinesByHospital = ({ hospitalId }) => {
    const [machines, setMachines] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newPreventiveMaintenance, setNewPreventiveMaintenance] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const role = localStorage.getItem('role');
    const setToastData=useToast();

    useEffect(() => {
        if(!role){
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
            }finally {
                setLoading(false);
              }
        };

        fetchMachines();
    }, [hospitalId,role]);

    const handleUpdateClick = async (machineId) => {
        if (!window.confirm("Are you sure you want to update?")) {
            return;
        }
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
            setToastData({color:'green',message:result.message});
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
            setToastData({color:'red',message:error});
        }finally {
            setLoading(false);
          }
    };

    const handleDeleteClick = async (machineId) => {
        if (window.confirm('Are you sure you want to delete this machine?')) {
            setLoading(true);
            try {
                const response = await fetch(`/equip/delete/${machineId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete machine');
                }
                const result = await response.json();
                setToastData({color:'green',message:result.message});
                const updatedMachines = machines.filter(machine => machine._id !== machineId);
                setMachines(updatedMachines);
            } catch (error) {
                console.error('Error deleting machine:', error);
                setToastData({color:'red',message:error});
            }finally {
                setLoading(false);
              }
        }
    };

    const handleEditClick = (machineId, currentPreventiveMaintenance) => {
        setEditId(machineId);
        setNewPreventiveMaintenance(currentPreventiveMaintenance);
    };

    const handleCancelClick = () => {
        setEditId(null);
        setNewPreventiveMaintenance('');
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
            {loading && <Loader/>}
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
                                <button onClick={() => handleUpdateClick(machine._id)} className="update-btn">Update</button>
                                <button onClick={handleCancelClick}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Preventive Maintenance:</strong><span>{machine.Preventive_Maintanence}</span></p>
                            {(role === 'Admin' || role === 'Manager') && (
                                <div className="btn-container">
                                    <button onClick={() => handleEditClick(machine._id, machine.Preventive_Maintanence)} className="update-btn">Edit</button>
                                    <button onClick={() => handleDeleteClick(machine._id)} className="delete-btn">Delete</button>
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