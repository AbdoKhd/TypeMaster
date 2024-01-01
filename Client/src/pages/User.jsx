import React, { useState, useEffect } from 'react';
import './User.css';
import NavBar from '../components/NavBar';
import { getLocalStorageUser } from '../UTILS/localStorageUtils';
import ResultsService from '../services/ResultsService';

const User = () => {
    const [userResults, setUserResults] = useState([]);

    useEffect(() => {
        const fetchUserResults = async () => {
            try {
                const userId = getLocalStorageUser().userId;
                const response = await ResultsService.getResults(userId);
                setUserResults(response.data.results || []);
                console.log(response.data.results);
            } catch (error) {
                console.error('Error fetching user results:', error);
            }
        };
        fetchUserResults();
    }, []);

    return (
        <div>
        <NavBar />
        <Results userResults={userResults}/>
        <h2 className="fw-bold mb-9 text-center" style={{ color: 'white' }}>Latest Results</h2>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr class="table-info">
              <th>TEXT</th>
              <th>WPM</th>
              <th>RAW</th>
              <th>TIME</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map((result, index) => (
              <tr key={index}>
                <td>{result.latest_text}</td>
                <td>{result.latest_wpm}</td>
                <td>{result.latest_raw}</td>
                <td>{result.latest_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

const Results = ({userResults}) => {

    const calculateAverageWPM = () => {
        if (userResults.length === 0) return 0;
    
        const totalWPM = userResults.reduce((acc, result) => acc + result.latest_wpm, 0);
        return Math.round(totalWPM / userResults.length);
    };
    
    const calculateGrowth = () => {
        if (userResults.length < 2) return 0;

        const latestWPM = userResults[userResults.length - 1].latest_wpm;
        const initialWPM = userResults[0].latest_wpm;

        return Math.round(((latestWPM - initialWPM) / initialWPM) * 100);
    };

    const calculateCompletedTexts = () => userResults.length;

    return (
        <div id="preview" className="preview">
            <div>
                <div data-draggable="true" className="" style={{ position: 'relative' }}>
                    {/* ... Other components for the content ... */}
                    <section draggable="false" className="container pt-5" data-v-271253ee="">
                        <section className="mb-10 text-center">
                            <div className="row gx-lg-5" style={{marginTop: '50px'}}>
                                {/* Card 1 */}
                                <div className="col-lg-4 col-md-12 mb-8 mb-lg-0" >
                                    <Card
                                        iconClass="fas fa-cubes fa-2x text-white"
                                        value={calculateAverageWPM()}
                                        label="Average WPM"
                                        description="This is the average WPM of all your completed tests."
                                    />
                                </div>

                                {/* Card 2 */}
                                <div className="col-lg-4 mb-8 mb-lg-0">
                                    <Card
                                        iconClass="fas fa-chart-pie fa-2x text-white"
                                        value={`${calculateGrowth()}%`}
                                        label="Growth"
                                        description="This is your growth percentage, from which you can know how much you have improved."
                                    />
                                </div>

                                {/* Card 3 */}
                                <div className="col-lg-4 mb-8 mb-lg-0">
                                    <Card
                                        iconClass="fas fa-cogs fa-2x text-white"
                                        value={calculateCompletedTexts()}
                                        label="Completed Sentences"
                                        description="This is the number of your completed tests."
                                    />
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    );
};

const Card = ({ iconClass, value, label, description }) => {
    return (
      <div className="card shadow-2-strong h-100">
        <div className="d-flex justify-content-center" style={{ marginTop: '-43px' }}>
          <div className="p-4 bg-primary rounded-circle shadow-5-strong d-inline-block">
            <i className={iconClass} aria-controls="#picker-editor"></i>
          </div>
        </div>
        <div className="card-body">
          <h3 className="fw-bold text-primary mb-3">{value}</h3>
          <h5 className="text-muted mb-3">{label}</h5>
          <p className="text-muted">{description}</p>
        </div>
      </div>
    );
};
  
export default User;
  