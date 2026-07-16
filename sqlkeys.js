module.exports = {
all:             `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1
                  ORDER BY ps.policy_number`,
                  
employee:        `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND ps.in_employee_handbook = 1
                  ORDER BY ps.policy_number`,

family:          `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND ps.in_family_handbook = 1
                  ORDER BY ps.policy_number`,

extracurricular: `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND ps.in_extracurricular_handbook = 1
                  ORDER BY ps.policy_number`,

headings:        `SELECT * FROM headings ORDER BY heading_id`,

board:           `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND LOWER(p.entity) LIKE '%board%'
                  ORDER BY ps.policy_number`,

admin:           `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND LOWER(p.entity) LIKE '%admin%'
                  ORDER BY ps.policy_number`,

board_pending:   `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND LOWER(p.entity) LIKE '%board%'
                  AND p.status != 'approved'
                  ORDER BY ps.policy_number`,

admin_pending:   `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND LOWER(p.entity) LIKE '%admin%'
                  AND p.status != 'approved'
                  ORDER BY ps.policy_number`,

approved:        `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND p.status = 'approved'
                  ORDER BY ps.policy_number`,

amended:         `SELECT p.*, ps.policy_number, ps.original_title
                  FROM policy_series ps
                  JOIN policies p ON p.policy_id = ps.current_policy_id
                  WHERE ps.active = 1 AND p.status = 'amended'
                  ORDER BY ps.policy_number`,
  
  
  employee_nonrelational_deprecated:        'SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number',
  family_nonrelational_deprecated:          'SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number',
  extracurricular_nonrelational_deprecated: 'SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number',
  headings_nonrelational_deprecated:        'SELECT * FROM headings ORDER BY heading_id',
  board_nonrelational_deprecated:           "SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' ORDER BY policy_number",
  admin_nonrelational_deprecated:           "SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' ORDER BY policy_number",
  board_pending_nonrelational_deprecated:   "SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number",
  admin_pending_nonrelational_deprecated:   "SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number",
  approved_nonrelational_deprecated:        "SELECT * FROM policies WHERE status = 'approved' ORDER BY policy_number",
  amended_nonrelational_deprecated:         "SELECT * FROM policies WHERE status = 'amended' ORDER BY policy_number",
  all_nonrelational_deprecated:             'SELECT * FROM policies ORDER BY policy_number',
};