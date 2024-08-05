import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/add.css';
import Loader from './Loader';
import { useToast } from './toaster';
import CustomAlert from './customAlert';

const AddMachineForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        treate_type: '',
        make: '',
        machine_prtocl: '',
        machine_type: '',
        hsptl_name: '',
        dateOfManufacture: '',
        purchaseDate: '',
        warrantyDate: '',
        count: '',
        Maintanence: '',
    });

    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [machineProtocols, setMachineProtocols] = useState([]);
    const [machineTypes, setMachineTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const setToastData = useToast();
    const [alertMessage, setAlert] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const id = localStorage.getItem('id');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDropdownData = async () => {
            setLoading(true);
            try {
                const [treatmentRes, protocolRes, typeRes] = await Promise.all([
                    fetch('/equip/treatment-types').then((res) => res.json()),
                    fetch('/equip/machine-protocols').then((res) => res.json()),
                    fetch('/equip/machine-types').then((res) => res.json()),
                ]);

                setTreatmentTypes(treatmentRes);
                setMachineProtocols(protocolRes);
                setMachineTypes(typeRes);
            } catch (error) {
                setToastData({ status: 'failure', message: 'Error fetching dropdown data!' });
                console.error('Error fetching dropdown data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchMachines = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/hsptl/name/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hospital name');
                }
                const data = await response.json();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    hsptl_name: data.hosp.hsptl_name,
                }));
            } catch (error) {
                setToastData({ status: 'failure', message: 'Error fetching hospital name!' });
                console.error('Error fetching hospital name:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMachines();
        fetchDropdownData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cancelbutton = () => {
        navigate('/machines');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, make, dateOfManufacture, purchaseDate, warrantyDate } = formData;
        const nameRegex = /^[A-Za-z ]{5,100}$/;
        const makeRegex = /^[A-Za-z ]{1,200}$/;

        if (!nameRegex.test(name)) {
            setAlert('Name field must be alphabets and between minimum 5 and maximum 200 characters.');
            setIsAlert(true);
            return;
        }

        if (!makeRegex.test(make)) {            
            setAlert('Make field must be alphabets and maximum 200 characters.');
            setIsAlert(true);
            return;
        }
        if (formData.name === '' || formData.treat_type === '' || formData.make === '' ||
            formData.machine_prtocl === '' || formData.machine_type === '' || formData.hsptl_name === '' ||
            formData.dateOfManufacture === '' || formData.purchaseDate === '' || formData.warrantyDate === '' ||
            formData.count === '' || formData.maintenance === '') {
            setAlert('Please fill all required fields');
            setIsAlert(true);
            return;
        }

        const today = new Date();
        if (new Date(dateOfManufacture) >= today || new Date(purchaseDate) >= today) {
            setAlert('Manufacture date and purchase date must be less than today.');
            setIsAlert(true);
            return;
        }

        if (new Date(purchaseDate) <= new Date(dateOfManufacture)) {
            setAlert('Purchase date must be greater than the date of manufacture.');
            setIsAlert(true);
            return;
        }

        if (new Date(warrantyDate) <= new Date(purchaseDate)) {
            setAlert('Warranty date must be greater than the purchase date.');
            setIsAlert(true);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/equip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setToastData({ status: 'success', message: 'Machine added sucessfully!' });
                setFormData({
                    name: '',
                    treate_type: '',
                    make: '',
                    machine_prtocl: '',
                    machine_type: '',
                    hsptl_name: '',
                    dateOfManufacture: '',
                    purchaseDate: '',
                    warrantyDate: '',
                    count: '',
                    Maintanence: '',
                });
                 navigate("/machines");
            } else {
                throw new Error('Error adding machine.');
            }
        } catch (error) {
            console.error('Error adding machine:', error);
            setToastData({ status: 'failure', message: 'An error occurred while adding the machine!' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="add-form">
            {loading &&
                <Loader />
            }
            {
                isAlert && <CustomAlert
                    title="Info"
                    message={alertMessage}
                    severity="info"
                    onCancel={() => setIsAlert(false)}
                />
            }
            <div className="add-form-group">
                <div>
                    <label>Machine Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Machine Make:</label>
                    <input type="text" name="make" value={formData.make} onChange={handleChange} />
                </div>
                <div>
                    <label>Treatment Type:</label>
                    <select name="treate_type" value={formData.treate_type} onChange={handleChange}>
                        <option value="">Select Treatment Type</option>
                        {treatmentTypes.map((type) => (
                            <option key={type._id} value={type.Type}>{type.Type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Machine Protocol:</label>
                    <select name="machine_prtocl" value={formData.machine_prtocl} onChange={handleChange}>
                        <option value="">Select Machine Protocol</option>
                        {machineProtocols.map((protocol) => (
                            <option key={protocol._id} value={protocol.Prtotocol}>{protocol.Prtotocol}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Machine Type:</label>
                    <select name="machine_type" value={formData.machine_type} onChange={handleChange}>
                        <option value="">Select Machine Type</option>
                        {machineTypes.map((type) => (
                            <option key={type._id} value={type.Type}>{type.Type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Hospital Name:</label>
                    <input type="text" name="hsptl_name" value={formData.hsptl_name} readOnly />
                </div>
                <div>
                    <label>Date of Manufacture:</label>
                    <input type="date" name="dateOfManufacture" value={formData.dateOfManufacture} onChange={handleChange} />
                </div>
                <div>
                    <label>Purchase Date:</label>
                    <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Warranty Date:</label>
                    <input type="date" name="warrantyDate" value={formData.warrantyDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Count:</label>
                    <input type="number" name="count" value={formData.count} onChange={handleChange} />
                </div>
                <div>
                    <label>Maintenance:</label>
                    <input type="text" name="Maintanence" value={formData.Maintanence} onChange={handleChange} />
                </div>
            </div>
            <div className="add-button-row">
                <button onClick={handleSubmit}>Add Machine</button>
                <button onClick={cancelbutton} style={{ backgroundColor: 'red' }}>Cancel</button>
            </div>


        </form>
    );
};

export default AddMachineForm;