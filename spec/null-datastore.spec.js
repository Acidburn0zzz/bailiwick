/**
 * NullDatastore tests
 *
 * jshint undef: true, unused: true, esnext: true
 * global it, describe, expect, beforeEach, afterEach, beforeAll, afterAll, console
 */
'use strict';

import Promise from 'bluebird';
import 'babel/polyfill';

import {NullDatastore, Model} from '../src/index';


class User extends Model {}


describe( 'Null Datastore class', () => {

	var datastore;

	beforeEach( () => {
		datastore = new NullDatastore();
	});


	describe( 'get', () => {

		it( 'fetches the object with the specified ID', done => {
			var testData = { testing: "object" };
			datastore.store( User, testData ).then( id => {
				datastore.get( User, id ).then( result => {
					expect( result ).toEqual( testData );
				});
			}).
			finally( done );
		});


		it( 'rejects with "no such object" when getting a non-existent object', done => {
			datastore.get( User, 1 ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).toEqual( "No such User ID=1" );
				}).
				finally( done );
		});

	});


	describe( 'get a collection', () => {

		describe( 'with an empty store', () => {

			it( 'resolves with an empty Array ', done => {
				datastore.get( User ).
					then( result => {
						expect( result.length ).toBe( 0 );
					}).
					finally( done );
			});

		});

		describe( 'with a store containing objects', () => {

			var objects = [
				{ firstName: "Robin", lastName: "Loxley", alias: "Robin Hood" },
				{ firstName: "Robin", lastName: "Williams" },
				{ firstName: "Robin", lastName: "Leach" }
			];

			beforeEach( done => {
				Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).finally( done );
			});


			it( "resolves with an empty Array if the criteria don't match anything", done => {
				datastore.get( User, { firstName: 'Rob' }).
					then( result => {
						expect( result.length ).toBe( 0 );
					}).
					finally( done );
			});


			it( "resolves with an Array of matches if the criteria match", done => {
				datastore.get( User, { firstName: 'Robin' }).
					then( result => {
						expect( result.length ).toBe( 3 );
						expect( result ).toEqual( jasmine.arrayContaining(objects) );
					}).
					finally( done );
			});

		});

	});


	describe( 'storing', () => {

		it( 'can store an object', done => {
			var objectData = {firstName: "Jimiril", lastName: "Pan"};

			datastore.store( User, objectData ).
				then( result => {
					expect( typeof result ).toEqual( 'number' );
					datastore.get( User, result ).then( obj => {
						expect( obj ).toEqual( objectData );
					});
				}).
				finally( done );
		});

	});



	describe( 'updating', () => {

		var objects = [
			{ firstName: "Marian", lastName: "Cooper", alias: "Maid Marian" },
			{ firstName: "Jillian", lastName: "Garland" },
			{ firstName: "Gillian", lastName: "Temper" }
		];
		var ids;

		beforeEach( done => {
			Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).
				then( newIds => {
					console.debug( `Got IDS=${newIds}` );
					ids = newIds;
				}).
				finally( done );
		});


		it( 'can update the data for an existing object', done => {
			var objId = ids[ 0 ];
			datastore.update( User, objId, {firstName: 'Jemma'} ).
				then( updatedData => {
					expect( updatedData ).
						toEqual({ firstName: "Jemma", lastName: "Cooper", alias: "Maid Marian" });
					datastore.get( User, objId ).then( obj => {
						expect( obj ).
							toEqual({ firstName: "Jemma", lastName: "Cooper", alias: "Maid Marian" });
					});
				}).
				finally( done );

		});


		it( 'rejects the returned Promise when attempting to update a non-existent object', done => {
			var nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			console.debug( `Non-existent ID = ${nonexistentId}` );

			datastore.update( User, nonexistentId, {firstName: 'Jaime'} ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).toEqual( `No such User ID=${nonexistentId}` );
				}).
				finally( done );
		});

	});


	describe( 'replacing', () => {

		var objects = [
			{ firstName: "Petyr", lastName: "Baelish", alias: "Little Finger" },
			{ firstName: "Jeyne", lastName: "Poole" },
			{ firstName: "Arya", lastName: "Stark", alias: "Waterdancer" }
		];
		var ids;

		beforeEach( done => {
			Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).
				then( newIds => {
					console.debug( `Got IDS=${newIds}` );
					ids = newIds;
				}).
				finally( done );
		});


		it( 'can replace the data for an existing object', done => {
			var objId = ids[ 2 ];
			datastore.replace( User, objId, {firstName: "Cat", lastName: "of the Canals"} ).
				then( replacedData => {
					expect( replacedData ).
						toEqual({ firstName: "Arya", lastName: "Stark", alias: "Waterdancer" });
					datastore.get( User, objId ).then( obj => {
						expect( obj ).
							toEqual({ firstName: "Cat", lastName: "of the Canals" });
					});
				}).
				finally( done );

		});


		it( 'rejects the returned Promise when attempting to replace a non-existent object', done => {
			var nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			console.debug( `Non-existent ID = ${nonexistentId}` );

			datastore.replace( User, nonexistentId, {firstName: 'Jaime'} ).
				catch( err => {
					expect( err.name ).toEqual( "Error" );
					expect( err.message ).toEqual( `No such User ID=${nonexistentId}` );
				}).
				finally( done );
		});

	});


	describe( 'removing', () => {

		var objects = [
			{ firstName: "Lukas-Kasha", alias: "the King" },
			{ firstName: "Kayim" },
			{ firstName: "Nur-Jehan" }
		];
		var ids;

		beforeEach( done => {
			Promise.map( objects, obj => {
					return datastore.store( User, obj );
				}).
				then( newIds => {
					console.debug( `Got IDS=${newIds}` );
					ids = newIds;
				}).
				finally( done );
		});


		it( 'can remove the data for an existing object', done => {
			var objId = ids[ 1 ];
			datastore.remove( User, objId ).
				then( removedData => {
					expect( removedData ).toBe( true );

					datastore.get( User, objId ).then( obj => {
						fail( `User ${objId} was not removed.` );
					}).
					catch( err => {
						expect( err.name ).toEqual( "Error" );
						expect( err.message ).toEqual( `No such User ID=${objId}` );
					});
				}).
				finally( done );

		});


		it( 'resolves the returned Promise when removing a non-existent object', done => {
			var nonexistentId = ids.reduce( (id1, id2) => id1 > id2 ? id1 : id2 ) + 1;
			console.debug( `Non-existent ID = ${nonexistentId}` );

			datastore.remove( User, nonexistentId ).
				then( result => {
					expect( result ).toBe( false );
				}).
				finally( done );
		});

	});

});

