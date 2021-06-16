import { historyRows, topupColumns } from '../topups/functions';

const TopUpReports = ({ data }) => {
  return (
    <>
      <div className="col">
        <div className="table-responsive ">
          {!data ||
            (data.length <= 0 && (
              <h2 className="text-center">No Data found!</h2>
            ))}

          {data && data.length > 0 && (
            <>
              <div>
                <button className="btn btn-primary btn-sm float-start">
                  Export PDF
                </button>
                <button
                  className="btn btn-info btn-sm "
                  style={{ marginLeft: '6px' }}
                >
                  Export CSV
                </button>
              </div>
              <table className="table table-striped table-hover table-sm mt-4 table-bordered">
                <thead>{topupColumns()}</thead>
                <tbody>{historyRows(data)}</tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopUpReports;
