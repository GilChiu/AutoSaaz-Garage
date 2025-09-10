import './JoinTeam.css';

const JoinTeam = () => {
  return (
    <section className="join-team-section">
      <h2 className="section-title">Become a Travel Agent</h2>
      <p className="section-subtitle">Join Our Team - Independently Owned and Operated</p>
      <div className="underline"></div>

      <div className="cards-top-row">
        <article className="card card-white card-franchise">
          <h3 className="card-title">Franchise Investment</h3>
          <div className="investment-breakdown">
            <p><strong>Required Investment Breakdown:</strong></p>
            <ul>
              <li>Enrollment Fee (Base Startup) <span>$649</span></li>
              <li>Background Check (one-time) <span>$60</span></li>
              <li>Admin Fee (one-time) <span>$75</span></li>
              <li>E&O Insurance (annual) <span>$180</span></li>
              <li>Access/Technology Fee (annual) <span>$85</span></li>
              <li>Virtual Training (required) <span>$249</span></li>
            </ul>
            <p className="monthly-crm">Monthly CRM/Tech Platform <span>$39/month</span></p>
            <p className="total-cost">Total Cost to Start: <strong>$1,298</strong></p>
          </div>

          <div className="commission-structure">
            <p><strong>Commission Structure:</strong></p>
            <ul>
              <li>Agent: <span>77%</span></li>
              <li>Agency Owner: <span>20%</span></li>
              <li>Cruise Planners Franchise: <span>3%</span></li>
              <li>Agency & Franchise Fee: <span>23%</span></li>
            </ul>
          </div>
        </article>
        <div className="right-column-cards">
          <article className="card card-blue card-why-join">
            <h3>Why Join Our Team?</h3>
            <ul>
              <li>Low-cost startup with ongoing support</li>
              <li>Flexible remote work lifestyle</li>
              <li>Direct mentorship from successful franchise owner</li>
              <li>Full access to industry tools, cruise & resort deals</li>
              <li>Team Sales Goals</li>
            </ul>
          </article>

          <article className="card card-white card-orange-optional">
            <h4>Optional Advanced Training</h4>
            <div className="training-details">
              <strong>STAR University</strong>
              <p>
                Details: Optional immersive training event for agents who want to elevate their knowledge and network with top vendors. Attend after launching your business.
              </p>
            </div>
          </article>
        </div>
      </div>
      <div className="cards-bottom-row">
        <article className="card card-white card-green-salary">
          <p>
            <strong>Average Travel Agent Salary in North Carolina</strong><br />
            As of July 2, 2025, travel agents in North Carolina have an average base salary of <strong>$22.42 per hour</strong>, according to Indeed.<br />
            <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer">Check current salaries on Indeed</a>
          </p>
        </article>
      </div>
    </section>
  );
};

export default JoinTeam;
