export default function createTableOfWinnersUI(): string {
  return `
    <table class="winners-table">
      <thead class="winners-table__head">
        <tr>
          <th>N</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time, s</th>
        </tr>
      </thead>
      <tbody class="winners-table__body">
        <tr>
          <td>1</td>
          <td>this car</td>
          <td>name</td>
          <td>5</td>
          <td>15</td>
        </tr>
      </tbody>
    </table>
  `;
}
