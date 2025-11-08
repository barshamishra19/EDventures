export default function Profile() {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="card p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="size-16 rounded-full bg-slate-800 grid place-items-center text-2xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-white">Aryan Karfa</p>
            <p className="text-slate-400 text-sm">Learner | Developer | Dreamer</p>
          </div>
          <button className="btn-primary sm:ms-auto">Edit Profile</button>
        </div>
      </div>
    );
  }
  