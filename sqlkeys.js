module.exports = {
  all:             `
    SELECT p.*, ps.policy_number, ps.original_title
    FROM policy_series ps
    JOIN policies p ON p.policy_id = ps.current_policy_id
    WHERE ps.active = 1
    ORDER BY ps.policy_number
  `,
  employee:        'SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number',
  family:          'SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number',
  extracurricular: 'SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number',
  headings:        'SELECT * FROM headings ORDER BY heading_id',
  board:           "SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' ORDER BY policy_number",
  admin:           "SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' ORDER BY policy_number",
  board_pending:   "SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number",
  admin_pending:   "SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number",
  approved:        "SELECT * FROM policies WHERE status = 'approved' ORDER BY policy_number",
  amended:         "SELECT * FROM policies WHERE status = 'amended' ORDER BY policy_number",
  all_nonrelational_deprecated:             'SELECT * FROM policies ORDER BY policy_number',
};