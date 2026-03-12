"use client";

import { FiSearch, FiFilter, FiDownload, FiUserPlus, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { DoctorSidebar } from "./DoctorSidebar";
import { Pagination } from "./Pagination";
import PatientActionsMenu from "./PatientActionsMenu";

type ManagedPatientsProps = {
    initialPatients: any[];
};

export default function ManagedPatientsClient({ initialPatients }: ManagedPatientsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const calculateAge = (birthDate: string) => {
        if (!birthDate) return null;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const filteredItems = initialPatients.filter(entry => {
        const patient = entry.patient;
        const searchContent = `${patient.firstName} ${patient.lastName} ${patient.email}`.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
    });

    const paginatedPatients = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="dashboard-wrapper">
            <DoctorSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main className="main-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Mes Patients</h1>
                        <p>Liste des patients suivis et historiques de consultation</p>
                    </div>
                </header>

                <div className="search-bar-wrapper mb-8">
                    <input
                        type="text"
                        placeholder="Rechercher un patient par nom ou email..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input glass"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="table-container glass">
                    <div className="table-wrapper">
                        <table className="patients-table">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Sexe</th>
                                    <th>Âge</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPatients.length > 0 ? (
                                    paginatedPatients.map(entry => {
                                        const patient = entry.patient;
                                        const age = calculateAge(patient.healthProfile?.birthDate);
                                        return (
                                            <tr key={entry.id}>
                                                <td>
                                                    <div className="patient-cell">
                                                        <div className="mini-avatar">
                                                            {patient.avatar ? (
                                                                <img src={patient.avatar} alt="" />
                                                            ) : (
                                                                <div className="placeholder">{patient.firstName[0]}</div>
                                                            )}
                                                        </div>
                                                        <strong>{patient.lastName} {patient.firstName}</strong>
                                                    </div>
                                                </td>
                                                <td>{patient?.healthProfile?.gender === 'M' ? 'Homme' : 'Femme'}</td>
                                                <td>{age ? `${age} ans` : 'NC'}</td>
                                                <td>{patient.phone || 'NC'}</td>
                                                <td>{patient.email}</td>
                                                <td>
                                                    <PatientActionsMenu patientId={patient.id} />
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="no-data">Aucun patient trouvé</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredItems.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>

            <style jsx>{`
                .dashboard-wrapper { display: flex; min-height: 100vh; background: var(--color-bg-secondary); }
                
                .main-content { 
                    margin-left: 280px; 
                    padding: var(--spacing-2xl); 
                    width: calc(100% - 280px); 
                    transition: all 0.3s ease;
                }
                
                .dashboard-header { margin-bottom: var(--spacing-2xl); }
                .dashboard-header h1 { font-size: 2.5rem; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                
                .search-bar-wrapper { position: relative; max-width: 500px; margin-bottom: 2rem; }
                .search-input { 
                    width: 100%; 
                    padding: 12px 20px 12px 45px; 
                    border-radius: 50px; 
                    border: 1px solid var(--glass-border); 
                    background: var(--color-bg);
                    color: var(--color-text);
                    outline: none;
                    transition: all 0.2s;
                }
                .search-input:focus {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px hsla(210, 100%, 56%, 0.1);
                }
                .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); opacity: 0.5; }

                .table-container { border-radius: var(--radius-xl); background: var(--glass-bg); border: 1px solid var(--glass-border); overflow: hidden; }
                .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .patients-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 800px; }
                .patients-table th { padding: 16px; background: rgba(0,0,0,0.02); font-weight: 600; color: var(--color-text-secondary); border-bottom: 2px solid var(--color-border-light); }
                .patients-table td { padding: 16px; border-bottom: 1px solid var(--color-border-light); vertical-align: middle; }
                
                .patient-cell { display: flex; align-items: center; gap: 12px; }
                .mini-avatar { 
                    width: 40px; 
                    height: 40px; 
                    border-radius: 50%; 
                    overflow: hidden; 
                    flex-shrink: 0; 
                    border: 1px solid var(--glass-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .mini-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
                .placeholder { width: 100%; height: 100%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%; }
                
                .btn { padding: 8px 16px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: none; text-decoration: none; display: inline-block; }

                .no-data { text-align: center; padding: 40px; color: var(--color-text-secondary); font-style: italic; }

                @media (max-width: 1024px) {
                    .main-content { 
                        margin-left: 0; 
                        width: 100%; 
                        padding: var(--spacing-xl); 
                        padding-top: 100px; 
                    }
                }
            `}</style>
        </div>
    );
}
