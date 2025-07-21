import type { MetricCardProps } from "../../types/MetricCard.interface";


const MetricCard: React.FC<MetricCardProps> = ({ title, timeInterval, data }) => {
  return (
    <>
      <h3>{title}</h3>
      <table /* className="row" */>
        <thead>
          <tr>
            <th>{timeInterval}</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(entry => {
              return (
                <tr>
                  <td>{entry.x}</td>
                  <td>{entry.y}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default MetricCard;