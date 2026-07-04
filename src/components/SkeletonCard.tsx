const SkeletonCard = () => {

  return (

    <div className="animate-pulse bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <div className="h-6 bg-slate-700 rounded w-1/2 mb-5"></div>

      <div className="space-y-3">

        <div className="h-4 bg-slate-700 rounded"></div>

        <div className="h-4 bg-slate-700 rounded w-5/6"></div>

        <div className="h-4 bg-slate-700 rounded w-2/3"></div>

      </div>

    </div>

  );

};

export default SkeletonCard;