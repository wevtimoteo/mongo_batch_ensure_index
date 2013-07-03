/*!
 * Mongo Indexes Creator
 * Weverton do Couto Timoteo - me[at]wolcan[dot]us
 *
 * Date: 2013-07-02
 */

/*!
 *  Setup connection
 */
var database_name = 'shipping_dev';
var host = "localhost";
var port = "27017";

/*!
 * Setup collections
 */
var collections = {
  shipping_ranges: [
    'initial_cep,end_cep,initial_weight,final_weight,shipping_company_id',
    'shipping_company_id,initial_cep,end_cep',
    'shipping_company_id',
    'initial_cep,initial_weight,state,region'
  ],
  table_imports: [
    'created_at,shipping_company_id'
  ],
  table_import_errors: [
    'table_import_id'
  ]
};

/*!
 * Connecting...
 */
var db = connect(host + ":" + port + "/" + database_name);

print("//- Listing collections:");
printjson(db.getCollectionNames());

/*!
 * Batch Ensure Indexes
 */
function batchEnsureIndexes(collections) {
  for (var collection in collections) {
    print("//-- Ensuring indexes for " + collection + " collection...");
    for (var index_group in collections[collection]) {
      index_group = collections[collection][index_group];

      formatted_index_group = formatIndexGroup(index_group);
      parametizedEnsureIndex(collection, formatted_index_group);
    }
  }
}

/*!
 * Format Index Group
 */
function formatIndexGroup(index_group) {
  indexes_split = index_group.split(',');

  grouped_indexes = '';

  indexes_split.forEach(function(index_name) {
    if (grouped_indexes.length > 0)
      grouped_indexes += ",";

    grouped_indexes += ("{" + index_name + ": 1}");

  });

  return grouped_indexes;
}

/*!
 * Parametized Ensure Index
 */
function parametizedEnsureIndex(collection, formatted_index_group) {
  print("db." + collection + ".ensureIndex(" + formatted_index_group + ");");
}

/*!
 * Running...
 */
batchEnsureIndexes(collections);
