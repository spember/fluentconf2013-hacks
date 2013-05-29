## Fluent Conf 2013 Hack projects

This is a cobbled together (cannot use the term 'cobbled' strongly enough) of different apps and hacks that I and others tinkered with while at Fluent Conf 2013. 

The goal was to provide a node.js / grunt environment for creating different projects to hack on. The basic folder structure is as follows:

*	__app__: main application code for each app being worked on, broken down by a per-project level
*	__css__: css files for the different apps. Could perhaps be some overlap
*	__server__: node.js server scripts
*	__templates: markup and templates used by the individual apps.


All very confusing, as in addition we may have a hodge-podge of Grunt tasks for executing different applications. For example, one can run 'grunt server' to startup an experiment with express.js and Angular.

