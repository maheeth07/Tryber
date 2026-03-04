import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGyms } from '../../api/gymApi';

function BrowseGym() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getGyms().then((res) => {
      setGyms(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-20"><h2>Loading Gyms...</h2></div>;

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-extrabold mb-2">Discover Gyms</h1>
          <p className="text-lg text-slate-400">Find the perfect fitness club near you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gyms.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-500">No gyms found yet. Be the first to register!</p>
        ) : (
          gyms.map((gym) => (
            <div key={gym._id} className="glass-card group flex flex-col h-full overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                🏋️‍♂️
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-white">{gym.name}</h3>
                <p className="text-slate-400 mb-6 flex items-center gap-2">
                  📍 {gym.location}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/gym/${gym.slug}`)}
                    className="w-full btn-primary"
                  >
                    View Membership Plans
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseGym;

