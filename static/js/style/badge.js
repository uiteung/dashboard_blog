export function getBadgeMarkup(status) {
  switch (status) {
    case true:
      return '<span class="badge-blue" style="font-size: 10px; background-color: #0d6efd; color: white; padding: 5px 10px; border-radius: 5px;">Valid</span>';
    case false:
      return '<span class="badge-warning" style="font-size: 10px; background-color: #ffcc00; color: white; padding: 5px 10px; border-radius: 5px;">Not Valid</span>';
  }
}