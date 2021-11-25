import useAuth from "../../hooks/useAuth";

export default function Payments() {
  let user = useAuth();

  return (
    <div>
      <h2 className="text-lg font-bold leading-none mb-6">Payments</h2>
      <hr />
      <div className="mt-4">
        {!user.isAdmin ? (
          <p>Payment Portal Coming Soon...</p>
        ) : (
          <p>Non-admin account required to view this area.</p>
        )}
      </div>
    </div>
  );
}
